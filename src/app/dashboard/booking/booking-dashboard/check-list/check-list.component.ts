import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "ng2-bootstrap-modal";
import {BookingService} from "../../../../services/booking/BookingService";
import {AddeventComponent} from "../../../master/event-type/addevent.component";
import {PickCheckListTemplateComponent} from "./pick-check-list-template/pick-check-list-template.component";
import {AUTH} from "../../../../util/Constants";
import {Store} from "../../../../util/Store";
import {AddBookingChecklistItemComponent} from "./add-booking-checklist-item/add-booking-checklist-item.component";
import {NotificationUtils} from "../../../../util/NotificationUtil";

declare var swal: any;

@Component({
    selector: 'app-check-list',
    templateUrl: './check-list.component.html',
    styleUrls: ['./check-list.component.css']
})
export class CheckListComponent implements OnInit {
    private fkBooking: any;
    private booking: any;

    private checkListItems: any;
    private bookingCheckListTemplate: any;

    constructor(private bookingService: BookingService,
                private route: Router,
                private store: Store,
                private router: ActivatedRoute,
                private notify: NotificationUtils,
                private dialogService: DialogService) {
        this.fkBooking = this.router.snapshot.params['id'];
    }

    ngOnInit() {
        this.bookingService.findBookingById(this.fkBooking)
            .subscribe(res => {
                this.booking = res;
            });

        this.findBookingCheckListTemplate();
        this.findBookingCheckListTemplateItem();
    }

    findBookingCheckListTemplate() {
        this.bookingService.findBookingCheckListTemplate(this.fkBooking)
            .subscribe(res => {
                this.bookingCheckListTemplate = res;
            });
    }

    navigateToBooking() {
        this.route.navigate(['/booking/dashboard/' + this.fkBooking]);
    }

    changeCheckListTemplate() {
        this.dialogService.addDialog(PickCheckListTemplateComponent, {
            fkEventType: this.booking.enquiry.fkEventType
        }).subscribe((result) => {
            if (result) {
                result.fkBooking = this.booking.id;
                result.createdBy = this.store.getData(AUTH.username);
                this.bookingService.createBookingCheckListTemplate(result)
                    .subscribe(res => {
                        this.ngOnInit();
                        swal({
                            type: "success",
                            title: "Success!",
                            text: "Check list template successfully reassigned to the booking!",
                            buttonsStyling: false,
                            confirmButtonClass: "btn btn-success"

                        });
                    });


            }
        });
    }

    findBookingCheckListTemplateItem() {
        this.bookingService.findBookingCheckListTemplateItem(this.fkBooking)
            .subscribe(res => {
                this.checkListItems = res;
            });
    }

    doneItem(item) {
        this.bookingService.checkBookingCheckListItemDone(item.id)
            .subscribe(res => {
                item.done = true;
                item.doneTime = new Date();
            });
    }

    addCheckListItem() {
        this.dialogService.addDialog(AddBookingChecklistItemComponent, {})
            .subscribe((result) => {
                if (result) {
                    result.fkBookingCheckList = this.bookingCheckListTemplate.id;
                    this.bookingService.saveBookingCheckListItem(result)
                        .subscribe(res => {
                            this.findBookingCheckListTemplateItem();
                            this.notify.success('Check list has been updated');
                        });
                }
            });
    }

}

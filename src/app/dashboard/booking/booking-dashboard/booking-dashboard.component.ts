import {Component, OnInit} from '@angular/core';
import {EnquiryService} from "../../../services/enquiry/EnquiryService";
import {ActivatedRoute, Router} from "@angular/router";
import {BookingService} from "../../../services/booking/BookingService";
import {PickCheckListTemplateComponent} from "./check-list/pick-check-list-template/pick-check-list-template.component";
import {DialogService} from "ng2-bootstrap-modal";
import {Store} from "../../../util/Store";
import {AUTH} from "../../../util/Constants";

declare var swal: any;

@Component({
    selector: 'app-booking-dashboard',
    templateUrl: './booking-dashboard.component.html',
    styleUrls: ['./booking-dashboard.component.css']
})
export class BookingDashboardComponent implements OnInit {

    private fkBooking: any;

    private booking: any;


    constructor(private enquiryService: EnquiryService,
                private bookingService: BookingService,
                private route: Router,
                private router: ActivatedRoute,
                private store: Store,
                private dialogService: DialogService) {
        this.fkBooking = this.router.snapshot.params['id'];

        this.bookingService.findBookingById(this.fkBooking)
            .subscribe(res => {
                this.booking = res;
            });
    }

    ngOnInit() {
    }

    navigateToLog(fkEnquiry) {
        this.route.navigate(['/booking/logger/' + fkEnquiry]);
    }

    navigateToItinerary() {
        this.route.navigate(['/booking/dashboard/' + this.fkBooking + '/itinerary-list']);
    }

    navigateToCheckList() {
        this.selectCheckListTemplate();
    }

    navigateToTablePlan() {
        this.route.navigate(['/booking/dashboard/' + this.fkBooking + '/table-plan']);
    }

    selectCheckListTemplate() {

        this.bookingService.findBookingCheckListTemplate(this.fkBooking)
            .subscribe(res => {
                if (res.id == undefined) {

                    this.dialogService.addDialog(PickCheckListTemplateComponent, {
                        fkEventType: this.booking.enquiry.fkEventType
                    }).subscribe((result) => {
                        if (result) {
                            result.fkBooking = this.booking.id;
                            result.createdBy = this.store.getData(AUTH.username);
                            this.bookingService.createBookingCheckListTemplate(result)
                                .subscribe(res => {
                                    this.route.navigate(['/booking/dashboard/' + this.fkBooking + '/check-list']);

                                    swal({
                                        type: "success",
                                        title: "Success!",
                                        text: "Check list template successfully assigned to the booking!",
                                        buttonsStyling: false,
                                        confirmButtonClass: "btn btn-success"

                                    });
                                });


                        }
                    });

                } else {
                    this.route.navigate(['/booking/dashboard/' + this.fkBooking + '/check-list']);
                }
            });
    }


}

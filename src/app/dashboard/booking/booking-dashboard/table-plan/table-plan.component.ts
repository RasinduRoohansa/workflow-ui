import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookingService} from "../../../../services/booking/BookingService";
import {CartPopupComponent} from "../../../shopping-cart/cart-popup/cart-popup.component";
import {DialogService} from "ng2-bootstrap-modal";
import {UploadTablePlanComponent} from "./upload-table-plan/upload-table-plan.component";

@Component({
    selector: 'app-table-plan',
    templateUrl: './table-plan.component.html',
    styleUrls: ['./table-plan.component.css']
})
export class TablePlanComponent implements OnInit {
    private fkBooking: any;
    private booking: any;

    private drawMode: boolean = false;

    private tablePlanHeaders: any;
    private tablePlans: any;

    private fkDocument: any;

    constructor(private bookingService: BookingService,
                private route: Router,
                private router: ActivatedRoute,
                private dialogService: DialogService) {
        this.fkBooking = this.router.snapshot.params['id'];
        this.findTablePlanHeader();
    }

    ngOnInit() {
        this.bookingService.findBookingById(this.fkBooking)
            .subscribe(res => {
                this.booking = res;
            });
    }

    changeToDrawMode() {
        this.drawMode = true;
    }

    changeToViewMode() {
        this.drawMode = false;
    }

    uploadTablePlan() {
        this.dialogService.addDialog(UploadTablePlanComponent, {
            fkBooking: this.booking.id
        }).subscribe((dataSet) => {
            if (dataSet == true) {
                this.findTablePlanHeader();
            }
        });
    }

    findTablePlanHeader() {
        this.bookingService.findTablePlanHeader(this.fkBooking)
            .subscribe(res => {
                this.tablePlanHeaders = res;

                if (res.length > 0) {
                    var plan = res[0];
                    this.findTablePlan(plan.id);
                }
            });
    }

    findTablePlan(fkDocument) {
        this.fkDocument = fkDocument;
        this.bookingService.findTablePlan(fkDocument)
            .subscribe(res => {
                this.tablePlans = res;
            });
    }

    changeTablePlan(tbl) {
        this.findTablePlan(tbl.id);
    }

    navigateToBooking() {
        this.route.navigate(['/booking/dashboard/' + this.fkBooking]);
    }


}

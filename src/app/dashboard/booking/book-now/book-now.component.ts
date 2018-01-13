import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WalkThroughService} from "../../../services/enquiry/WalkThroughService";
import {BookingService} from "../../../services/booking/BookingService";
import {Store} from "../../../util/Store";
import {AUTH} from "../../../util/Constants";
import {NotificationUtils} from "../../../util/NotificationUtil";
import {EnquiryService} from "../../../services/enquiry/EnquiryService";

declare var swal: any;
declare var $: any;

@Component({
    selector: 'app-book-now',
    templateUrl: './book-now.component.html',
    styleUrls: ['./book-now.component.css']
})
export class BookNowComponent implements AfterViewInit {

    private fkWalkThrough: number;

    private booking: any = {
        fkWalkThrough: null,
        depositAmount: 0,
        createdBy: this.store.getData(AUTH.username),
        startDate: null,
        endDate: null
    };

    private subTotal: number = 0;
    private tax: number = 0;
    private total: number = 0;

    private enquiry: any;

    constructor(private router: ActivatedRoute,
                private walkThroughService: WalkThroughService,
                private bookingService: BookingService,
                private enquiryService: EnquiryService,
                private store: Store,
                private notify: NotificationUtils,
                private route: Router) {
        this.fkWalkThrough = this.router.snapshot.params['id'];

        this.enquiryService.getEnquiryByWalkThroughId(this.fkWalkThrough)
            .subscribe(res => {
                this.enquiry = res;
                this.booking.startDate = res.startDate;
                this.booking.endDate = res.endDate;
            })
    }

    ngAfterViewInit(): void {
        this.walkThroughService.findCartSummeryDetail(this.fkWalkThrough)
            .subscribe(res => {
                this.total = res.total;
                this.subTotal = res.subTotal;
                this.tax = res.tax;
            });
    }

    bookNow() {
        this.booking.fkWalkThrough = this.fkWalkThrough;
        swal({
            title: 'Are you sure?',
            text: 'Do you want to proceed the booking ? ',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, book now!',
            cancelButtonText: 'No, keep it',
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: "btn btn-danger",
            buttonsStyling: false
        }).then(val => {
                this.bookingService.createBookingByWalkThrough(this.booking)
                    .subscribe(res => {
                        this.route.navigate(['enquiry']);
                        swal({
                            title: 'Success!',
                            text: 'Booking is confirmed! Booking Number : ' + res.bookingNumber,
                            type: 'success',
                            confirmButtonClass: "btn btn-success",
                            buttonsStyling: false
                        })
                    });
            }
            , function (dismiss) {

            })

    }

}

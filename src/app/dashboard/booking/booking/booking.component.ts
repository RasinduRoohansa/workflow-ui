import {Component, OnInit} from '@angular/core';
import {BookingService} from "../../../services/booking/BookingService";
import {Router} from "@angular/router";

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

    private status: number;
    private bookings: any;
    private nextBooking: any;

    constructor(private bookingService: BookingService,
                private route: Router) {
    }

    ngOnInit() {
        this.bookingService.findAllBookings()
            .subscribe(res => {
                this.bookings = res;
            });

        this.bookingService.findNextBooking()
            .subscribe(res => {
                this.nextBooking = res;
            });
    }

    navigateToBookingDashboard(id) {
        this.route.navigate(['/booking/dashboard/' + id]);
    }

}

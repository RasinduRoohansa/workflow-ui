import {Component, Input, OnInit} from '@angular/core';
import {BookingService} from "../../../../services/booking/BookingService";
import {Router} from "@angular/router";

@Component({
    selector: 'app-booking-dashboard-header',
    templateUrl: './booking-dashboard-header.component.html',
    styleUrls: ['./booking-dashboard-header.component.css']
})
export class BookingDashboardHeaderComponent implements OnInit {

    @Input("fkBooking") fkBooking: any;

    private booking: any;

    constructor(private bookingService: BookingService,
                private route: Router) {
    }

    ngOnInit() {
        this.bookingService.findBookingById(this.fkBooking)
            .subscribe(res => {
                this.booking = res;
            });
    }

    navigateToBooking() {
        this.route.navigate(['/booking']);
    }
}

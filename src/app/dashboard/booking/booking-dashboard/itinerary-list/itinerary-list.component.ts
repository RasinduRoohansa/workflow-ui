import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-itinerary-list',
    templateUrl: './itinerary-list.component.html',
    styleUrls: ['./itinerary-list.component.css']
})
export class ItineraryListComponent implements OnInit {

    private fkBooking: any;

    constructor(private router: ActivatedRoute) {
        this.fkBooking = this.router.snapshot.params['id'];
    }

    ngOnInit() {
    }

}

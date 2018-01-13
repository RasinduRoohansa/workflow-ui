import {Component, OnInit} from '@angular/core';
import {EnquiryService} from "../../../services/enquiry/EnquiryService";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-event-logger',
    templateUrl: './event-logger.component.html',
    styleUrls: ['./event-logger.component.css']
})
export class EventLoggerComponent implements OnInit {

    private fkEnquiry: number;

    private activityLogs: any;

    constructor(private enquiryService: EnquiryService,
                private router: ActivatedRoute) {
        this.fkEnquiry = this.router.snapshot.params['id'];
    }

    ngOnInit() {
        this.enquiryService.findActLogByEnquiryId(this.fkEnquiry)
            .subscribe(res => {
                this.activityLogs = res;
            });
    }

}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MasterService} from "../../../services/master/MasterService";
import {DomSanitizer} from "@angular/platform-browser";
import {SingleInputComponent} from "../../common/single-input.component";
import {DialogService} from "ng2-bootstrap-modal";
import {Store} from "../../../util/Store";
import {AUTH} from "../../../util/Constants";
import {NotificationUtils} from "../../../util/NotificationUtil";
import {EnquiryService} from "../../../services/enquiry/EnquiryService";

@Component({
    selector: 'view-more',
    templateUrl: './viewmore.component.html'
})
export class ViewmoreComponent extends OnInit {

    private spaceId: any;
    private facilities = [];

    private venueSpace = {
        name: '',
        description: '',
        createdByFullname: '',
        createdDate: null,
        venue: {
            web: '',
            phone: '',
            email: '',
            venueName: ''
        }
    };
    private image = {
        image: null
    };

    constructor(private route: Router,
                private enquiryService: EnquiryService,
                private _sanitizer: DomSanitizer,
                private router: ActivatedRoute,
                private store: Store,
                private notify: NotificationUtils,
                private masterService: MasterService,
                private dialogService: DialogService) {
        super();
    }

    ngOnInit(): void {
        this.router.queryParams.subscribe(params => {
            if (params['id']) {
                this.spaceId = atob(params['id']);
                this.findVenueSpace();
                this.findFacility();
            } else {
                this.route.navigate(['master/venueMaster']);
            }
        });
    }

    findVenueSpace() {
        this.masterService.findVenueSpaceBySpaceId(this.spaceId)
            .subscribe(res => {
                this.venueSpace = res;
                if (res.image) {
                    this.image = {
                        image: this._sanitizer.bypassSecurityTrustResourceUrl(res.image.image)
                    };
                }
            });
    }

    goBackPage() {
        this.route.navigate(['master/venueMaster']);
    }

    findFacility() {
        this.masterService.findFacility(this.spaceId)
            .subscribe(res => {
                this.facilities = res;
            });
    }

    addFacility() {
        this.dialogService.addDialog(SingleInputComponent, {
            title: 'Add Facility',
            message: '',
            fieldName: 'Facility Name'
        }).subscribe((res) => {
            if (res) {
                var facility = {
                    facility: res,
                    createdBy: this.store.getData(AUTH.username),
                    fkVenueSpace: this.spaceId
                };
                this.masterService.saveFacility(facility)
                    .subscribe(res => {
                        this.findFacility();
                        this.notify.success('Facility list has been updated!');
                    }, err => {
                        this.notify.error('Something went wrong. Please check again!');
                    });
            } else {

            }
        });
    }

    getImage(image) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(image);
    }

    viewImage(id) {
        this.enquiryService.findImage(id)
            .subscribe(res => {
                this.image = {
                    image: this._sanitizer.bypassSecurityTrustResourceUrl(res.image)
                };
            });
    }
}
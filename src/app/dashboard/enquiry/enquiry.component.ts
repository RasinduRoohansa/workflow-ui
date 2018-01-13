import {AfterViewInit, Component} from "@angular/core";
import {EnquiryService} from "../../services/enquiry/EnquiryService";
import {DomSanitizer} from "@angular/platform-browser";
import {UserService} from "../../services/user/UserService";
import {Store} from "../../util/Store";
import {AUTH} from "../../util/Constants";
import {DialogService} from "ng2-bootstrap-modal";
import {AllocatePopupComponent} from "./allocatepopup.component";
import {Router} from "@angular/router";
import {PickTemplateComponent} from "./pick-template.component";
import {WalkThroughService} from "../../services/enquiry/WalkThroughService";
import {NotificationUtils} from "../../util/NotificationUtil";

declare var $: any;

@Component({
    selector: 'enquiry-cmp',
    templateUrl: './enquiry.component.html',
    styles: [
        '.box-enq{ width: 100%;height: 200px}'
    ]
})
export class EnquiryComponent extends AfterViewInit {
    ngAfterViewInit(): void {
        $(".selectpicker").selectpicker();
        $('[data-toggle="tooltip"]').tooltip();
    }

    private enquiries: any;
    private allocatedEnquiries: any;
    private searchText: string;
    private viewEnquiry: any;

    private spaceImage = null;
    private privileges = [];
    private status: number = 1;

    private loading: boolean = false;

    constructor(private walkthroughService: WalkThroughService,
                private _sanitizer: DomSanitizer,
                private enquiryService: EnquiryService,
                private store: Store,
                private dialogService: DialogService,
                private notify: NotificationUtils,
                private route: Router) {
        super();
        this.getEnquiry();
    }

    checkPrivileges(privilege) {
        return this.privileges.includes(privilege);
    }

    getEnquiry() {
        this.loading = true;
        this.enquiryService.getEnquiry(this.status)
            .subscribe(res => {
                this.enquiries = res;

                if (res) {
                    this.viewEnquiry = res[0];
                }
                this.loading = false;
            });
    }

    loadEnquiryByStatus(status) {
        this.status = status;

        this.getEnquiry();
    }

    viewSelectedEnquiry(enquiry) {
        this.spaceImage = null;
        this.viewEnquiry = enquiry;

        if (enquiry.fkDocument != null) {
            this.enquiryService.findImage(enquiry.fkDocument)
                .subscribe(res => {
                    this.spaceImage = this._sanitizer.bypassSecurityTrustResourceUrl(res.image);
                });
        }
    }

    getBackground(image) {
        return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
    }

    getDescriptionShort(desc) {
        if (desc != null) {
            if (desc.length >= 60) {
                return desc.substring(0, 60).concat('....');
            }
            return desc.substring(0, desc.length);
        }
        return '';
    }

    viewAllocatePopup(enquiry) {
        this.dialogService.addDialog(AllocatePopupComponent, {
            enquiry: enquiry
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.getEnquiry();
            }
        });
    }

    walkthroughButton(allocatedToUsername) {
        return this.store.getData(AUTH.username) == allocatedToUsername;
    }

    createQuoteStepOne(id) {
        this.route.navigate(['quote-step1']);
    }

    navigateToWalkthrough(id) {
        this.walkthroughService.findWalkthroughByEnquiryId(id)
            .subscribe(res => {
                if (res.id == null) {
                    this.dialogService
                        .addDialog(PickTemplateComponent, {
                            fkEventType: this.viewEnquiry.fkEventType
                        })
                        .subscribe((templateId) => {
                            if (templateId) {
                                let enquiry = {
                                    fkQuoteEnquiry: this.viewEnquiry.id,
                                    fkQuestionTemplate: templateId,
                                    createdBy: this.store.getData(AUTH.username)
                                };
                                this.walkthroughService.mapEnquiryWalkthroughTemplate(enquiry)
                                    .subscribe(res => {
                                        this.route.navigate(['enquiry/walk-through/' + id]);
                                    });
                            }
                        });
                } else {
                    this.route.navigate(['enquiry/walk-through/' + id]);
                }
            });
    }

    refreshEnquiry() {
        this.getEnquiry();
        this.notify.success('Enquiry list has been updated!');
    }

    navigateToLog(id) {
        this.route.navigate(['enquiry/logger/' + id]);
    }
}
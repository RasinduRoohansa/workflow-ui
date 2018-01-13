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
import {TransportAllocationComponent} from "./transportAllocationPopup.component";

declare var $: any;
declare var swal: any;

@Component({
    selector: 'enquiry-cmp',
    templateUrl: './transportAllocation.component.html',
    styles: [
        '.box-enq{ width: 100%;height: 200px}'
    ]
})

export class DriverAllocation extends AfterViewInit {
    ngAfterViewInit(): void {
        $(".selectpicker").selectpicker();
        $('[data-toggle="tooltip"]').tooltip();
    }

    private enquiries: any;
    private allocatedEnquiries: any;
    private searchText: string;
    private viewEnquiry: any;

    private spaceImage = null;
    private status = 1;

    private loading: boolean = false;

    constructor(private walkthroughService: WalkThroughService,
                private _sanitizer: DomSanitizer,
                private enquiryService: EnquiryService,
                private store: Store,
                private dialogService: DialogService,
                private route: Router) {
        super();
        this.getEnquiry();
    }

    getEnquiry() {
        this.loading = true;
        this.enquiryService.getAllocatedDriver(this.status)
            .subscribe(res => {
                this.enquiries = res;
                console.log(res);
                if (res) {
                    this.viewEnquiry = res[0];
                }
                this.loading = false;
            });
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

    getDescriptionShort(desc) {
        if (desc != null) {
            if (desc.length >= 60) {
                return desc.substring(0, 60).concat('....');
            }
            return desc.substring(0, desc.length);
        }
        return '';
    }

    viewDriverAllocationPopUp(enquiry) {
        this.dialogService.addDialog(TransportAllocationComponent, {
            enquiry: enquiry
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                this.getEnquiry();
            }
        });
    }

    getImage(image) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(image);
    }

    unAllocateDriver(enquiry) {
        enquiry.createdBy = this.store.getData(AUTH.username);
        this.enquiryService.unAllocateTransport(enquiry)
            .subscribe(res => {
                swal({
                    type: "success",
                    title: "Success!",
                    text: "Successfully Unallocated!",
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success"
                });
                this.getEnquiry();
            });
    }
}
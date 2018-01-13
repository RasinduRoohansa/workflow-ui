import {AfterViewInit, Component} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {NotificationUtils} from "../../util/NotificationUtil";
import {UserService} from "../../services/user/UserService";
import {EnquiryService} from "../../services/enquiry/EnquiryService";
import {Store} from "../../util/Store";
import {AUTH} from "../../util/Constants";

declare var $: any;

export interface ConfirmModel extends AfterViewInit {
    enquiry: any
}

@Component({
    selector: 'allocate-enquiry',
    templateUrl: './allocatepopup.component.html'
})
export class AllocatePopupComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    enquiry: any;
    private users = [];
    private enquiryAllocation = {
        fkEnquiry: null,
        createdBy: null,
        fkUser: null
    };

    ngAfterViewInit(): void {
        $(".selectpicker").selectpicker();
        this.userService.findUsersByRoleGroup('G001')
            .subscribe(res => {
                this.enquiryAllocation.fkEnquiry = this.enquiry.id;
                this.enquiryAllocation.createdBy = this.store.getData(AUTH.username);
                this.users = res;
                setTimeout(() => {
                    $(".selectpicker").selectpicker('refresh');
                }, 150);
            });
    }

    constructor(dialogService: DialogService,
                private notify: NotificationUtils,
                private userService: UserService,
                private store: Store,
                private enquiryService: EnquiryService) {
        super(dialogService);
    }

    allocateEnquiry() {
        if (this.enquiryAllocation.fkUser == null) {
            this.notify.warn("Please select a user to allocate enquiry!");
        } else {
            this.enquiryService.allocateEnquiry(this.enquiryAllocation)
                .subscribe(res => {
                    this.notify.success("Enquiry is successfully allocated to user!");

                    this.result = true;
                    this.close();
                });
        }
    }
}
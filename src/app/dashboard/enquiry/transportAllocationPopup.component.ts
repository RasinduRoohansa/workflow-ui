import {AfterViewInit, Component} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {NotificationUtils} from "../../util/NotificationUtil";
import {UserService} from "../../services/user/UserService";
import {EnquiryService} from "../../services/enquiry/EnquiryService";
import {Store} from "../../util/Store";
import {AUTH} from "../../util/Constants";
import {MasterService} from "../../services/master/MasterService";
import {DomSanitizer} from "@angular/platform-browser";
import {CropComponent} from "../crop/crop.component";

declare var $: any;

export interface ConfirmModel extends AfterViewInit {
    enquiry: any
}

@Component({
    selector: 'transportAllocationPopUp',
    templateUrl: './transportAllocationPopUp.component.html'
})
export class TransportAllocationComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    enquiry: any;

    private driverList:any;
    private driverAllocation = {
        fkDriver: null,
        createdBy: null,
        fkEnquiry: null
    };

    constructor(dialogService: DialogService,
                private notify: NotificationUtils,
                private userService: UserService,
                private store: Store,
                private masterService: MasterService,
                private enquiryService: EnquiryService) {
        super(dialogService);
    }
    ngAfterViewInit(): void {
        $(".selectpicker").selectpicker();
        this.masterService.findActiveDriver()
            .subscribe(res => {
                this.driverAllocation.fkEnquiry = this.enquiry.id;
                this.driverAllocation.createdBy = this.store.getData(AUTH.username);
                this.driverList = res;
                setTimeout(() => {
                    $(".selectpicker").selectpicker('refresh');
                }, 150);
            });
    }
    allocateDriver() {
        this.driverAllocation.fkEnquiry=this.enquiry.id;
        this.driverAllocation.createdBy = this.store.getData(AUTH.username);
        if (this.driverAllocation.fkDriver == null) {
            this.notify.warn("Please select Driver!");
        } else {
            this.enquiryService.allocateDriver(this.driverAllocation)
                .subscribe(res => {
                    this.notify.success("Driver Allocated Successfully !");
                    this.result = true;
                    this.close();
                });
        }
    }
}
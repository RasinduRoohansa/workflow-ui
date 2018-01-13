import {AfterViewInit, Component} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {NotificationUtils} from "../../../util/NotificationUtil";
import {UserService} from "../../../services/user/UserService";
import {EnquiryService} from "../../../services/enquiry/EnquiryService";
import {Store} from "../../../util/Store";
import {AUTH} from "../../../util/Constants";
import {DomSanitizer} from "@angular/platform-browser";

declare var $: any;

export interface ConfirmModel extends AfterViewInit {
    voucherObj: any
}

@Component({
    selector: 'transportVoucherPreview',
    templateUrl: './transport.voucher.preview.component.html'
})
export class TransportVoucherPreviewComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    public latitude: number;
    public longitude: number;
    public zoom: number;

    voucherObj: any;

    constructor(dialogService: DialogService ) {
        super(dialogService);
        this.zoom = 12;

    }
    ngAfterViewInit(): void {
    }
    ngOnInit(): void {
        console.log(this.voucherObj);
        this.latitude = this.voucherObj.lan;
        this.longitude = this.voucherObj.lon;
    }
}
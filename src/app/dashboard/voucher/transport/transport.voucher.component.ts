import {AfterViewInit, Component} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {NotificationUtils} from "../../../util/NotificationUtil";
import {UserService} from "../../../services/user/UserService";
import {EnquiryService} from "../../../services/enquiry/EnquiryService";
import {Store} from "../../../util/Store";
import {AUTH} from "../../../util/Constants";
import {DomSanitizer} from "@angular/platform-browser";
import {TransportAllocationComponent} from "../../enquiry/transportAllocationPopup.component";
import {TransportVoucherPreviewComponent} from "./transport.voucher.preview.component";

declare var $: any;

export interface ConfirmModel extends AfterViewInit {
    enquiry: any
}

@Component({
    selector: 'transportVoucher',
    templateUrl: './transport.voucher.component.html'
})
export class TransportVoucherComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    enquiry: any;

    private transportVoucherList:any;
    private pdfSrc: string = '/pdf-test.pdf';
    constructor(dialogService: DialogService,
                private notify: NotificationUtils,
                private userService: UserService,
                private store: Store,
                private enquiryService: EnquiryService,
                private _sanitizer: DomSanitizer ) {
        super(dialogService);
    }
    ngAfterViewInit(): void {

    }
    ngOnInit(): void {
       this.getTransportVoucherList();
    }
    getTransportVoucherList() {
        this.enquiryService.getTransportVoucherList()
            .subscribe(res => {
                this.transportVoucherList = res;
            });
    }
    getImage(image) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(image);
    }
    viewTransportVoucher(transportVoucher) {
        console.log(transportVoucher);
        this.dialogService.addDialog(TransportVoucherPreviewComponent, {
            voucherObj: transportVoucher
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                // this.getEnquiry();
            }
        });
    }
}
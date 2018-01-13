import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {NotificationUtils} from "../../../../../util/NotificationUtil";
import {BookingService} from "../../../../../services/booking/BookingService";

export interface ConfirmModel extends AfterViewInit {
    fkBooking: any
}

@Component({
    selector: 'app-upload-table-plan',
    templateUrl: './upload-table-plan.component.html',
    styleUrls: ['./upload-table-plan.component.css']
})
export class UploadTablePlanComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    fkBooking: any;

    private file: any;
    private uploading: boolean = false;

    constructor(dialogService: DialogService,
                private notify: NotificationUtils,
                private bookingService: BookingService) {
        super(dialogService);
    }

    ngAfterViewInit(): void {

    }

    fileChangeListener($event) {
        var inputValue = $event.target;
        this.file = inputValue.files[0];
    }

    upload() {
        this.uploading = true;
        let formData: FormData = new FormData();
        formData.append('file', this.file, this.file.name);

        this.bookingService.uploadTablePlan(formData, this.fkBooking)
            .subscribe(res => {

                if (res.code == 500) {
                    this.notify.warn(res.msg);
                    this.file = null;
                } else {
                    this.result = true;
                    this.close();

                    this.notify.success('Excel file data successfully uploaded!');
                }
                this.uploading = false;

            });
    }
}

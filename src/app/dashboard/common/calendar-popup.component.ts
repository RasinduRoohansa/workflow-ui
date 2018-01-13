import {Component} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";

export interface ConfirmModel {
    name: string;
    start: any;
    end: any;
}

@Component({
    selector: 'calendar-popup',
    templateUrl: './calendar-popup.component.html'
})
export class CalendarPopupComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    start: any;
    end: any;
    name: string;

    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    crop() {
        this.result = true;
        this.close();
    }
}
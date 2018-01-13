import {Component} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";

export interface ConfirmModel {
    title: string;
    message: string;
    fieldName:string;
}

@Component({
    selector: 'crop-img',
    templateUrl: './single-input.component.html'
})
export class SingleInputComponent extends DialogComponent<ConfirmModel, string> implements ConfirmModel {
    fieldName: string;
    title: string;
    message: string;

    private input: string;

    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    crop() {
        this.result = this.input;
        this.close();
    }
}
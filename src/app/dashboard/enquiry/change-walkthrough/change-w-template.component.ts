import {AfterViewInit, Component} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";

declare var $: any;

export interface ConfirmModel extends AfterViewInit {

}

@Component({
    selector: 'change-w-template',
    templateUrl: './change-w-template.component.html'
})
export class ChangeWTemplateComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {

    ngAfterViewInit(): void {

    }

    constructor(dialogService: DialogService) {
        super(dialogService);
    }
}
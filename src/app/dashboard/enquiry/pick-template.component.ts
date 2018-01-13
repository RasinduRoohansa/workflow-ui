import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {WalkThroughService} from "../../services/enquiry/WalkThroughService";

declare var $: any;

export interface ConfirmModel extends OnInit {
    fkEventType: any;
}

@Component({
    selector: 'pick-template',
    templateUrl: './pick-template.component.html'
})
export class PickTemplateComponent extends DialogComponent<ConfirmModel, any> implements ConfirmModel {
    fkEventType: any;

    private templateId: any;
    private templates: any;

    constructor(dialogService: DialogService,
                private walkthroughService: WalkThroughService) {
        super(dialogService);
    }

    ngOnInit(): void {
        $(".selectpicker").selectpicker();
        this.walkthroughService.findActiveTemplates(this.fkEventType)
            .subscribe(res => {
                this.templates = res;
                setTimeout(() => {
                    $(".selectpicker").selectpicker('refresh');
                }, 150);
            });
    }

    selectTemplate() {
        this.result = this.templateId;
        this.close();
    }
}
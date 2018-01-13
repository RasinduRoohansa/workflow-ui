import {AfterViewInit, Component} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {MasterService} from "../../../services/master/MasterService";
import {WalkThroughService} from "../../../services/enquiry/WalkThroughService";
import {Store} from "../../../util/Store";
import {AUTH} from "../../../util/Constants";

declare var $: any;

export interface ConfirmModel extends AfterViewInit {

}

@Component({
    selector: 'create-template',
    templateUrl: './create-template.component.html'
})
export class CreateTemplateComponent extends DialogComponent<ConfirmModel, any> implements ConfirmModel {
    ngAfterViewInit(): void {
        $(".selectpicker").selectpicker();
    }

    private eventTypes: any;
    private template = {
        id: null,
        fkEventType: null,
        name: null,
        createdBy: this.store.getData(AUTH.username),
        isConfirmed: false
    };

    constructor(dialogService: DialogService,
                private store: Store,
                private masterService: MasterService,
                private walkthroughService: WalkThroughService) {
        super(dialogService);
        this.findActiveEventTypes();
    }

    findActiveEventTypes() {
        this.masterService.findActiveEventTypes()
            .subscribe(res => {
                this.eventTypes = res;
                setTimeout(() => {
                    $(".selectpicker").selectpicker('refresh');
                }, 150);
            });
    }

    cancel() {
        this.result = this.template;
        this.close();
    }

    createTemplate() {
        this.walkthroughService.createTemplate(this.template)
            .subscribe(res => {
                this.template.id = res;
                this.template.isConfirmed = true;
                this.result = this.template;
                this.close();
            });
    }
}
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {MasterService} from "../../../services/master/MasterService";
import {WalkThroughService} from "../../../services/enquiry/WalkThroughService";
import {Store} from "../../../util/Store";
import {AUTH} from "../../../util/Constants";
import {NotificationUtils} from "../../../util/NotificationUtil";

declare var $: any;

export interface ConfirmModel extends OnInit {
    templateId: any;
}

@Component({
    selector: 'create-question',
    templateUrl: './create-question.component.html'
})
export class CreateQuestionComponent extends DialogComponent<ConfirmModel, any> implements ConfirmModel {
    templateId: any;

    private questions: any;
    private selectedQuestion: any;

    private questionItem = {
        fkQuestionType: null,
        fkTemplate: null,
        createdBy: this.store.getData(AUTH.username)
    };

    constructor(dialogService: DialogService,
                private store: Store,
                private notify: NotificationUtils,
                private walkthroughService: WalkThroughService) {
        super(dialogService);
    }

    ngOnInit(): void {
        this.walkthroughService.findQuestionType()
            .subscribe(res => {
                this.questions = res;
                setTimeout(() => {
                    $(".selectpicker").selectpicker('refresh');
                }, 150);
            });
    }

    cancel() {
        this.result = null;
        this.close();
    }

    createQuestionItem() {
        this.questionItem.fkQuestionType = this.selectedQuestion;
        this.questionItem.fkTemplate = this.templateId;

        this.result = this.questionItem;
        this.close();
    }
}
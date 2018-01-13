import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "ng2-bootstrap-modal";
import {CreateQuestionComponent} from "./create-question.component";
import {WalkThroughService} from "../../../services/enquiry/WalkThroughService";
import {Store} from "../../../util/Store";
import {AUTH} from "../../../util/Constants";
import {NotificationUtils} from "../../../util/NotificationUtil";

@Component({
    selector: 'walk-template',
    templateUrl: './walk-template.component.html'
})
export class WalkTemplateComponent {
    private templateId: any;
    private questions: any;
    private subQuestions: any;

    private question = {
        createdBy: this.store.getData(AUTH.username),
        optionList: null,
        questionItem: {
            id: null,
            type: null,
            question: null
        }
    };
    private code: any;

    private optionList = [];

    constructor(private route: Router,
                private store: Store,
                private router: ActivatedRoute,
                private dialogService: DialogService,
                private notify: NotificationUtils,
                private walkThroughService: WalkThroughService) {
        this.templateId = this.router.snapshot.params['id'];
        this.findQuestionTypeByTemplateId();
    }

    createQuestion() {
        this.dialogService.addDialog(CreateQuestionComponent, {
            templateId: this.templateId
        }).subscribe((result) => {
            if (result != null) {
                this.walkThroughService.createQuestionItem(result)
                    .subscribe(res => {
                        this.findQuestionTypeByTemplateId();
                        this.notify.success("Question list has been updated!");
                    });
            }
        });
    }

    findQuestionTypeByTemplateId() {
        this.walkThroughService.findQuestionTypeByTemplateId(this.templateId)
            .subscribe(res => {
                this.questions = res;
                console.log(this.questions);

                if (this.questions.length > 0) {
                    this.question.questionItem = this.findQuestionByQuestionId(this.questions[0]);
                }
            });
    }

    findQuestionByTemplateId() {
        this.walkThroughService.findQuestionTypeByTemplateId(this.templateId)
            .subscribe(res => {
                this.questions = res;
            });
    }

    findQuestionByType(question) {
        this.question.questionItem = this.findQuestionByQuestionId(question);
    }

    deactivateSubQuestionByOption(option) {
        this.walkThroughService.deactivateSubQuestionByOption(option.id)
            .subscribe(res => {
                this.notify.success("Sub question is deactivated!");
            });
    }

    findQuestionByQuestionId(question) {
        if (question.main == true) {
            this.subQuestions = [];
        }
        if (question.type.code == 'QN3' || question.type.code == 'QN4') {
            let type = '';
            if (question.type.code == 'QN3') {
                type = 'Option ';
            } else if (question.type.code == 'QN4') {
                type = 'Check ';
            }
            this.walkThroughService.findSingleOptionByItemId(question.id)
                .subscribe(res => {
                    let opList = [];
                    res.forEach(value => {
                        opList.push({
                            id: value.id,
                            fkSubQuestionItem: value.fkSubQuestionItem,
                            name: type + (opList.length + 1),
                            optionText: value.optionText
                        });
                    });
                    question.optionList = opList;

                    if (question.optionList.length == 0) {
                        question.optionList = [
                            {
                                fkSubQuestionItem: null,
                                id: null,
                                name: type + '1',
                                optionText: null
                            }
                        ];
                    }

                    if (question.main == true) {
                        this.findSubQuestionsForOptions(question);
                    }
                });

        }
        return question;
    }

    findSubQuestionsForOptions(question) {
        this.walkThroughService.findSubQuestionForOptions(question.id)
            .subscribe(res => {
                res.forEach(qn => {
                    this.subQuestions.push(this.findQuestionByQuestionId(qn));
                });
            });
    }

    addOptionButton(question) {
        question.optionList.push({
            id: null,
            fkSubQuestionItem: null,
            name: "Option " + (question.optionList.length + 1),
            optionText: null
        });
    }

    addCheckButton() {
        this.optionList.push({
            id: null,
            fkSubQuestionItem: null,
            name: "Check " + (this.optionList.length + 1),
            optionText: null
        });
    }

    removeOption(index, question) {
        let tempOption = [];
        for (var i = 0; i < question.optionList.length; i++) {
            if (i != index) {
                tempOption.push(question.optionList[i]);
            }
        }

        question.optionList = [];
        for (var i = 0; i < tempOption.length; i++) {
            var res = tempOption[i];
            res.name = 'Option ' + (i + 1);
            question.optionList.push(res);
        }
    }

    removeCheck(index) {
        let tempOption = [];
        for (var i = 0; i < this.optionList.length; i++) {
            if (i != index) {
                tempOption.push(this.optionList[i]);
            }
        }

        this.optionList = [];
        for (var i = 0; i < tempOption.length; i++) {
            var res = tempOption[i];
            res.name = 'Check ' + (i + 1);
            this.optionList.push(res);
        }
    }

    previousQuestion() {
        for (var i = 0; i <= this.questions.length; i++) {
            var res = this.questions[i];
            if (res.id == this.question.questionItem.id) {
                if (i == 0) {
                    this.question.questionItem = this.findQuestionByQuestionId(this.questions[this.questions.length - 1]);
                } else {
                    this.question.questionItem = this.findQuestionByQuestionId(this.questions[i - 1]);
                }
                break;
            }
        }
    }

    nextQuestion() {
        for (var i = 0; i <= this.questions.length; i++) {
            var res = this.questions[i];
            if (res.id == this.question.questionItem.id) {
                if (i == this.questions.length - 1) {
                    this.question.questionItem = this.findQuestionByQuestionId(this.questions[0]);
                } else {
                    this.question.questionItem = this.findQuestionByQuestionId(this.questions[i + 1]);
                }
                break;
            }
        }
    }

    saveQuestion(question) {
        let validation = true;

        if (question.type.code == 'QN3' || question.type.code == 'QN4') {
            if (question.optionList.length == 0) {
                this.notify.warn("At least one option is required!");
                validation = false;
            }
        }

        if (validation) {
            this.walkThroughService.saveQuestion(question)
                .subscribe(res => {
                    this.notify.success("Question has been updated successfully!");
                });
        }
    }

    tagQuestion(option) {
        if (option.id != null) {
            this.dialogService.addDialog(CreateQuestionComponent, {
                templateId: this.templateId
            }).subscribe((result) => {
                if (result != null) {
                    option.questionItem = result;
                    this.walkThroughService.tagQuestionToOption(option)
                        .subscribe(res => {
                            option.fkSubQuestionItem = res.fkSubQuestionItem;
                            this.notify.success("Question has been tag to option!");
                        });
                }
            });
        } else {
            this.notify.warn("Cannot create sub question for unsaved options!");
        }
    }

    getQuestion(q, type) {
        if (q != null) {
            if (q.length <= 40) {
                return q.substring(0, q.length);
            }
            return q.substring(0, 40) + '...';
        } else {
            return type.type;
        }
    }
}
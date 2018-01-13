import {AfterViewInit, Component} from "@angular/core";
import {WalkThroughService} from "../../services/enquiry/WalkThroughService";
import {ActivatedRoute} from "@angular/router";
import {EnquiryService} from "../../services/enquiry/EnquiryService";
import {NotificationUtils} from "../../util/NotificationUtil";
import {DialogService} from "ng2-bootstrap-modal";
import {ChangeWTemplateComponent} from "./change-walkthrough/change-w-template.component";

declare var swal: any;
declare var $: any;

@Component({
    selector: 'walkthrough-cmp',
    templateUrl: './walkthrough.component.html'
})
export class WalkthroughComponent {
    private step1 = false;
    private step2 = false;
    private step3 = false;

    private enquiryId: any;
    private templateId: any;

    private walkthrough: any;
    private viewEnquiry: any;

    private questionList: any;

    private parentQuestion: any;
    private currentQuestion: any;
    private currentNumber: any;
    private clientStory: any;

    private loading: boolean = false;

    private answer = {
        fkQuoteEnquiryWalkthrough: null,
        fkQuestionTemplateItem: null,
        answer: null,
        answerHeadline: null,
        fkQuestionSingleOption: null
    };

    private finishButton: boolean = false;

    constructor(private walkThroughService: WalkThroughService,
                private enquiryService: EnquiryService,
                private dialogService: DialogService,
                private notify: NotificationUtils,
                private router: ActivatedRoute) {
        this.enquiryId = this.router.snapshot.params['id'];

        this.loading = true;
        this.enquiryService.findEnquiryById(this.enquiryId)
            .subscribe(res => {
                this.viewEnquiry = res;

                if (this.viewEnquiry.clientStoryAdded == true) {
                    this.step3 = false;
                    this.step2 = true;
                    this.step1 = false;
                } else {
                    this.step3 = false;
                    this.step2 = false;
                    this.step1 = true;
                }

                this.walkThroughService.findWalkthroughByEnquiryId(this.enquiryId)
                    .subscribe(res => {
                        this.walkthrough = res;

                        this.findQuestionIdByTemplateId(this.walkthrough.fkQuestionTemplate);
                    });

                this.walkThroughService.findClientStory(this.enquiryId)
                    .subscribe(res => {
                        this.clientStory = res.clientStory;
                    });

                this.loading = false;
            });
    }

    findQuestionIdByTemplateId(id) {
        this.walkThroughService.findQuestionIdByTemplateId(id)
            .subscribe(res => {
                this.questionList = res;

                if (res.length > 0) {
                    this.currentQuestion = res[0];
                    this.currentNumber = 0;
                    this.findQuestionByQuestionId(this.currentQuestion);
                }
            });
    }

    goStepThree() {
        this.step3 = true;
        this.step2 = false;
        this.step1 = false;
    }

    findQuestionByQuestionId(question) {

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

                });

        }
        return question;
    }

    saveAndNextQuestion() {
        let validation = true;
        let subQuestion: any;

        if (this.currentQuestion.type.code == 'QN3') {

            if (this.answer.fkQuestionSingleOption == null) {
                validation = false;
                this.notify.warn('Select a option to continue');
            }

        }

        if (validation == true) {

            this.answer.fkQuestionTemplateItem = this.currentQuestion.id;
            this.answer.fkQuoteEnquiryWalkthrough = this.walkthrough.id;
            this.walkThroughService.saveQuestionAnswer(this.answer)
                .subscribe(res => {
                    this.answer = {
                        fkQuoteEnquiryWalkthrough: null,
                        fkQuestionTemplateItem: null,
                        answer: null,
                        answerHeadline: null,
                        fkQuestionSingleOption: null
                    };
                });

            if (this.answer.fkQuestionSingleOption != null) {
                this.walkThroughService.findSubQuestionItemByOptionId(this.answer.fkQuestionSingleOption)
                    .subscribe(res => {
                        subQuestion = res;
                        this.answer.fkQuestionSingleOption = null;

                        this.nextQuestion(subQuestion);
                    });
            } else {
                this.nextQuestion(null);
            }

        }

    }

    nextQuestion(subQuestion) {
        if (subQuestion != null && subQuestion.id) {
            this.parentQuestion = this.currentQuestion;
            this.currentQuestion = subQuestion;
        } else {
            if (this.questionList.length - 1 > this.currentNumber) {
                this.currentNumber = this.currentNumber + 1;
                this.parentQuestion = null;
                this.currentQuestion = this.questionList[this.currentNumber];
            } else {
                this.finishButton = true;
            }
        }
        this.findQuestionByQuestionId(this.currentQuestion)
    }

    bookNow() {
        swal({
            title: 'Are you sure?',
            text: 'Do you want to proceed the booking ? ',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, book now!',
            cancelButtonText: 'No, keep it',
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: "btn btn-danger",
            buttonsStyling: false
        }).then(() =>
                swal({
                    title: 'Success!',
                    text: 'Quote is confirmed!',
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                })
            , function (dismiss) {

            })
    }

    getDescriptionShort(desc) {
        if (desc != null) {
            if (desc.length >= 60) {
                return desc.substring(0, 60).concat('....');
            }
            return desc.substring(0, desc.length);
        }
        return '';
    }

    changeTemplate() {
        this.dialogService.addDialog(ChangeWTemplateComponent, {}).subscribe((isConfirmed) => {
            if (isConfirmed) {

            }
        });
    }

    saveClientStory() {
        let clientStoryEnq = {
            fkEnquiryId: this.viewEnquiry.id,
            clientStory: this.clientStory
        };
        this.walkThroughService.saveClientStory(clientStoryEnq)
            .subscribe(res => {
                this.step1 = false;
                this.step2 = true;
                this.step3 = false;
            });
    }

    viewMenuItem() {
        this.step1 = false;
        this.step2 = true;
        this.step3 = false;
    }

    viewShoppingCart() {
        this.step1 = false;
        this.step2 = false;
        this.step3 = true;
    }

    viewClientStory() {
        this.step1 = true;
        this.step2 = false;
        this.step3 = false;
    }
}
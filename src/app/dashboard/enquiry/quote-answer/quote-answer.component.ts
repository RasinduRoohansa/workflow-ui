import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {WalkThroughService} from "../../../services/enquiry/WalkThroughService";

@Component({
    selector: 'app-quote-answer',
    templateUrl: './quote-answer.component.html',
    styleUrls: ['./quote-answer.component.css']
})
export class QuoteAnswerComponent implements AfterViewInit {

    @Input("fkWalkThroughId") fkWalkThroughId: number;

    private quoteAnswer: any;

    constructor(private walkThroughService: WalkThroughService) {

    }

    ngAfterViewInit(): void {
        this.walkThroughService.findQuestionAnswer(this.fkWalkThroughId)
            .subscribe(res => {
                this.quoteAnswer = res;
            })
    }
}

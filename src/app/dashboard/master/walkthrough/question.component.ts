import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {CreateTemplateComponent} from "./create-template.component";
import {DialogService} from "ng2-bootstrap-modal";
import {WalkThroughService} from "../../../services/enquiry/WalkThroughService";
import {DomSanitizer} from "@angular/platform-browser";

declare var swal: any;

@Component({
    selector: 'question',
    templateUrl: './question.component.html'
})
export class QuestionComponent extends OnInit {

    private templates: any;
    private searchText = '';

    constructor(private _sanitizer: DomSanitizer,
                private router: Router,
                private dialogService: DialogService,
                private walkthroughService: WalkThroughService) {
        super();
    }

    ngOnInit(): void {
        this.findTemplates();
    }

    findTemplates() {
        this.walkthroughService.findTemplates()
            .subscribe(res => {
                this.templates = res;
            });
    }

    createTemplate() {
        this.dialogService.addDialog(CreateTemplateComponent, {}).subscribe((result) => {
            //We get dialog result
            if (result.isConfirmed) {
                this.router.navigate(['master/question-maker/template/' + result.id]);

                swal({
                    type: "success",
                    title: "Success!",
                    text: "Walk through template successfully created!",
                    buttonsStyling: false,
                    confirmButtonText: 'Lets Start!',
                    confirmButtonClass: "btn btn-success"
                });
            } else {

            }
        });
    }

    getImage(image) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(image);
    }

    loadTemplate(id) {
        this.router.navigate(['master/question-maker/template/' + id]);
    }

}
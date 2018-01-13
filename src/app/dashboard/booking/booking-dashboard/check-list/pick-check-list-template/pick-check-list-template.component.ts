import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {NotificationUtils} from "../../../../../util/NotificationUtil";
import {MasterService} from "../../../../../services/master/MasterService";
import {AUTH} from "../../../../../util/Constants";
import {UserService} from "../../../../../services/user/UserService";

declare var swal: any;
declare var $: any;

export interface ConfirmModel extends AfterViewInit {
    fkEventType: any;
}

@Component({
    selector: 'app-pick-check-list-template',
    templateUrl: './pick-check-list-template.component.html',
    styleUrls: ['./pick-check-list-template.component.css']
})
export class PickCheckListTemplateComponent extends DialogComponent<ConfirmModel, any> implements ConfirmModel {
    fkEventType: any;


    private checkListTemplates: any;
    private users: any;

    private bookingCheckListTemplate: any = {
        fkMasterCheckList: null,
        fkUser: null
    };

    constructor(dialogService: DialogService,
                private notify: NotificationUtils,
                private masterService: MasterService,
                private userService: UserService) {
        super(dialogService);
    }

    findCheckListTemplateByEventType() {
        this.masterService.findCheckListTemplateByEventType(this.fkEventType)
            .subscribe(res => {
                this.checkListTemplates = res;

                setTimeout(() => {
                    $(".selectpicker").selectpicker('refresh');
                }, 150);
            })
    }

    ngOnInit() {
        $(".selectpicker").selectpicker('refresh');
    }

    ngAfterViewInit(): void {
        this.findCheckListTemplateByEventType();

        this.userService.findUsersByRoleGroup('G002')
            .subscribe(res => {
                this.users = res;
                setTimeout(() => {
                    $(".selectpicker").selectpicker('refresh');
                }, 150);
            });
    }

    save() {
        this.result = this.bookingCheckListTemplate;
        this.close();
    }

}

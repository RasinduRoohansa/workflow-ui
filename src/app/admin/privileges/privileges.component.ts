import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user/UserService";
import {NotificationUtils} from "../../util/NotificationUtil";
import {GrantPopupComponent} from "./grantpopup.component";
import {DialogService} from "ng2-bootstrap-modal";

declare var $: any;

@Component({
    selector: 'privileges-admin-cmp',
    templateUrl: 'privileges.component.html',
})
export class PrivilegesComponent extends OnInit {
    ngOnInit(): void {
        setTimeout(() => {
            $(".selectpicker").selectpicker();
        }, 150);
    }

    private userList = [];  //Active user list
    private roleList = [];  //Active role list
    private fkFeature: any;

    private selectedUser: any;
    private selectedFeature: any;
    private allocatedFeatures = [];

    private grant: any;

    constructor(private userService: UserService,
                private notify: NotificationUtils,
                private dialogService: DialogService) {
        super();
        this.userService.findActiveUsers()
            .subscribe(res => {
                this.userList = res;

                this.userService.findActiveRole()
                    .subscribe(res => {
                        this.roleList = res;

                        setTimeout(() => {
                            $(".selectpicker").selectpicker('refresh');
                        }, 150);
                    });
            });
    }

    findPrivillegesByUserId() {
        this.userService.findPrivillegesByUserId(this.selectedUser.id)
            .subscribe(res => {
                console.log(res);
                this.allocatedFeatures = res;
            });
    }

    viewGrantPopup() {
        this.grant = {
            read: false,
            write: false,
            delete: false,
            update: false,
            fkUser: null,
            fkRole: null,
            fkSystemFeatures: null
        };

        this.dialogService.addDialog(GrantPopupComponent, {
            user: this.selectedUser,
            grant: this.grant,
            update: false
        }).subscribe((isConfirmed) => {
            //We get dialog result
            if (isConfirmed) {
                this.findPrivillegesByUserId();
            } else {

            }
        });
    }

    editGrantPopup(grant) {
        this.dialogService.addDialog(GrantPopupComponent, {
            user: this.selectedUser,
            grant: grant,
            update: true
        }).subscribe((isConfirmed) => {
            //We get dialog result
            if (isConfirmed) {
                this.findPrivillegesByUserId();
            } else {
                this.findPrivillegesByUserId();
            }
        });
    }
}
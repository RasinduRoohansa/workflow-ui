import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {UserService} from "../../services/user/UserService";
import {NotificationUtils} from "../../util/NotificationUtil";

declare var swal: any;
declare var $: any;

export interface ConfirmModel extends OnInit {
    user: any;
    grant: any;
    update: boolean;
}

@Component({
    selector: 'grantpopup-enquiry',
    templateUrl: './grantpopup.component.html'
})
export class GrantPopupComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    update: boolean;
    user: any;
    grant: any;
    private systemFeatures = [];

    private selectedFeature = {
        description: '',
        id: null
    };

    ngOnInit(): void {
        setTimeout(() => {
            $(".selectpicker").selectpicker();
        }, 150);
    }

    constructor(dialogService: DialogService,
                private userService: UserService,
                private notify: NotificationUtils) {
        super(dialogService);

        this.findAllSystemFeatures();
    }

    findAllSystemFeatures() {
        this.userService.findSystemFeatures()
            .subscribe(res => {
                this.systemFeatures = res;
                if (this.update) {
                    this.systemFeatures.forEach(f => {
                        if (f.id == this.grant.fkSystemFeatures) {
                            this.selectedFeature = f;
                        }
                    });
                }

                setTimeout(() => {
                    $(".selectpicker").selectpicker('refresh');
                }, 150);
            });
    }

    deletePrivilege() {
        swal({
            title: 'Are you sure?',
            text: 'Do you want to remove privilege ? ',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'No, keep it',
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: "btn btn-danger",
            buttonsStyling: false
        }).then(() =>
                this.userService.deletePrivilege(this.grant.id)
                    .subscribe(res => {
                        this.result = true;
                        this.close();

                        swal({
                            title: 'Deleted!',
                            text: 'Grant privileges removed!',
                            type: 'success',
                            confirmButtonClass: "btn btn-success",
                            buttonsStyling: false
                        })
                    })
            , function (dismiss) {

            })
    }

    savePrivileges() {
        if (this.selectedFeature) {
            if (this.user) {
                this.grant.fkUser = this.user.id;
            }
            this.grant.fkSystemFeatures = this.selectedFeature.id;
            this.userService.savePrivileges(this.grant)
                .subscribe(res => {
                    this.result = true;
                    this.close();
                    this.notify.success('System feature was allocated');
                });
        } else {
            this.notify.warn('System feature is not select');
        }
    }
}
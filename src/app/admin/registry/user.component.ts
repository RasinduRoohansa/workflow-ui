import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user/UserService";
import {NotificationUtils} from "../../util/NotificationUtil";
import {AuthService} from "../../configuration/AuthService";
import {Store} from "../../util/Store";
import {AUTH} from "../../util/Constants";

declare var swal: any;

@Component({
    selector: 'user-admin-cmp',
    templateUrl: 'user.component.html',
})
export class UserAdminComponent extends OnInit {

    private user: any;
    private users: any;

    constructor(private userService: UserService,
                private authService: AuthService,
                private notify: NotificationUtils,
                private store: Store) {
        super();
        this.findAllUsers();
    }

    ngOnInit(): void {
        this.user = {
            admin: false,
            username: '',
            createdBy: this.store.getData(AUTH.username)
        };
    }

    findAllUsers() {
        this.userService.findAllUsers()
            .subscribe(res => {
                this.users = res;
            });
    }

    activateUser(user) {
        this.userService.activateUser(user.id)
            .subscribe(res => {
                user.activated = true;

                this.notify.success(user.username + ', User activated')
            });
    }

    showSwal(user) {
        swal({
            title: 'Are you sure?',
            text: 'Do you want to deactivate username : ' + user.username,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, deactivate it!',
            cancelButtonText: 'No, keep it',
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: "btn btn-danger",
            buttonsStyling: false
        }).then(() =>
                this.userService.deactivateUser(user.id)
                    .subscribe(res => {
                        user.activated = false;

                        swal({
                            title: 'Deactivated!',
                            text: 'User has been deactivated.',
                            type: 'success',
                            confirmButtonClass: "btn btn-success",
                            buttonsStyling: false
                        })
                    })
            , function (dismiss) {
                if (dismiss === 'cancel') {
                    swal({
                        title: 'Cancelled',
                        text: 'User is not deactivated :)',
                        type: 'error',
                        confirmButtonClass: "btn btn-info",
                        buttonsStyling: false
                    })
                }
            })
    }

    saveUser() {
        this.authService.findUser(this.user.username).subscribe(u => {

            if (u.username) {
                this.notify.error("Username is already exists :(. Please try again using another username")
            } else {
                this.userService.saveUser(this.user)
                    .subscribe(res => {
                        this.findAllUsers();
                        this.ngOnInit();
                        swal({
                            title: 'Good Job!',
                            text: 'New user has been created.',
                            type: 'success',
                            confirmButtonClass: "btn btn-success",
                            buttonsStyling: false
                        })
                    });
            }

        });
    }

}
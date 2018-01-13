import {AfterViewInit, Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user/UserService";
import {NotificationUtils} from "../../util/NotificationUtil";

declare var $: any;

@Component({
    selector: 'role-admin-cmp',
    templateUrl: 'role.component.html',
})
export class RoleAdminComponent extends OnInit {
    private role = {};
    private userList = [];  //Active user list
    private roleList = [];  //Active role list
    private rolesToAssign = [];  //Active role list
    private selectedUser = null;
    private selectedRoleToAssign = null; //Selected Role

    private menus = [];

    ngOnInit(): void {
        setTimeout(() => {
            $(".selectpicker").selectpicker();
        }, 150);
    }

    constructor(private userService: UserService,
                private notify: NotificationUtils) {
        super();

        this.userService.findActiveUsers()
            .subscribe(res => {
                this.userList = res;
                setTimeout(() => {
                    $(".selectpicker").selectpicker('refresh');
                }, 150);
            });

        this.findActiveRole();
        this.userService.findActiveRole()
            .subscribe(res => {
                this.rolesToAssign = res;
                setTimeout(() => {
                    $(".selectpicker").selectpicker('refresh');
                }, 150);
            });
    }

    saveRole() {
        this.userService.saveRole(this.role)
            .subscribe(res => {
                this.notify.success("New role created successfully");
                this.role = {};
                this.findActiveRole();
            });
    }

    findActiveRole() {
        this.userService.findActiveRole()
            .subscribe(res => {
                this.roleList = res;
                this.findUserRoleMapper();
                setTimeout(() => {
                    $(".selectpicker").selectpicker('refresh');
                }, 150);
            });
    }

    findUserRoleMapper() {
        if (this.selectedUser != null) {
            this.userService
                .findUserRoleMapper(this.selectedUser)
                .subscribe(res => {
                    this.roleList
                        .forEach(value => {
                            value.checked = false;
                        });

                    if (res.length > 0) {
                        res.forEach(id => {
                            this.roleList
                                .filter(value => value.id == id)
                                .forEach(value => {
                                    value.checked = true;
                                });
                        });
                    }
                });
        }
    }

    assignRoleToUser(role) {
        this.userService
            .assignRole(role.id, this.selectedUser, role.checked)
            .subscribe(res => {

            });
    }

    findMenus() {
        this.userService
            .findMenus(this.selectedRoleToAssign)
            .subscribe(res => {
                this.menus = res;
            });
    }

    assignToRole(menu) {
        this.userService
            .assignToRole(menu.id, this.selectedRoleToAssign, menu.selected)
            .subscribe(res => {
            });
    }

    assignSubmenuToRole(menu) {
        this.userService
            .assignSubmenuToRole(menu.id, this.selectedRoleToAssign, menu.selected)
            .subscribe(res => {
            });
    }

}
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AdminRoutes} from './admin.routing';

import {Store} from "../util/Store";
import {AuthService} from "../configuration/AuthService";
import {Http, HttpModule} from "@angular/http";
import {AppConstants} from "../configuration/AppConstants";
import {AuthenticatedHttpService} from "../configuration/custom/AuthenticatedHttpService";
import {UserAdminComponent} from "./registry/user.component";
import {RoleAdminComponent} from "./registry/role.component";
import {UserService} from "../services/user/UserService";
import {NotificationUtils} from "../util/NotificationUtil";
import {AdminComponent} from "./admin.component";
import {PrivilegesComponent} from "./privileges/privileges.component";
import {GrantPopupComponent} from "./privileges/grantpopup.component";
import {BootstrapModalModule, DialogService} from "ng2-bootstrap-modal";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(AdminRoutes),
        ReactiveFormsModule,
        HttpModule,
        BootstrapModalModule,
        BootstrapModalModule.forRoot({container: document.body}),
    ],
    declarations: [
        AdminComponent,
        UserAdminComponent,
        RoleAdminComponent,
        PrivilegesComponent,
        GrantPopupComponent
    ],
    entryComponents: [GrantPopupComponent],
    providers: [
        AuthService, AppConstants, Store, UserService, NotificationUtils, DialogService,
        {provide: Http, useClass: AuthenticatedHttpService}
    ]
})

export class AdminModule {
}

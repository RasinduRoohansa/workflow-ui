import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {Http, HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';

import {SidebarModule} from './sidebar/sidebar.module';
import {FooterModule} from './shared/footer/footer.module';
import {NavbarModule} from './shared/navbar/navbar.module';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {AppRoutes} from './app.routing';
import {Store} from "./util/Store";
import {AuthGuard} from "./configuration/AuthGuard";
import {AuthenticatedHttpService} from "./configuration/custom/AuthenticatedHttpService";
import {AuthService} from "./configuration/AuthService";
import {AppConstants} from "./configuration/AppConstants";
import {NotificationUtils} from "./util/NotificationUtil";
import {HttpService} from "./configuration/HttpService";
import {SharedService} from "./util/SharedService";
import {UserService} from "./services/user/UserService";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {DashboardLayoutComponent} from "./layouts/dashboard/dashboard-layout.component";
import {AdminLayoutComponent} from "./layouts/admin/admin-layout.component";
import {SidebarAdminModule} from "./sidebar-admin/sidebar-admin.module";
import {CommonUtilService} from "./util/CommonUtilService";
import {AdminAuthGuard} from "./configuration/AdminAuthGuard";
import {MomentModule} from "angular2-moment";
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';
import {WalkThroughConstants} from "./configuration/constant/WalkThroughConstants";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes),
        HttpModule,
        SidebarModule,
        SidebarAdminModule,
        NavbarModule,
        FooterModule,
        MomentModule,
        NgIdleKeepaliveModule.forRoot()
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
        DashboardLayoutComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        Store,
        AuthGuard, AdminAuthGuard,
        {provide: Http, useClass: AuthenticatedHttpService},
        AuthService,
        AppConstants, WalkThroughConstants,
        SharedService,
        NotificationUtils,
        HttpService,
        UserService,
        CommonUtilService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

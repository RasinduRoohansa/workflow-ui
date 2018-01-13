import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
// import { MdIconModule, MdCardModule, MdInputModule, MdCheckboxModule, MdButtonModule } from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';

import {PagesRoutes} from './pages.routing';

import {RegisterComponent} from './register/register.component';
import {PricingComponent} from './pricing/pricing.component';
import {LockComponent} from './lock/lock.component';
import {LoginComponent} from './login/login.component';
import {Store} from "../util/Store";
import {AuthService} from "../configuration/AuthService";
import {Http, HttpModule} from "@angular/http";
import {AppConstants} from "../configuration/AppConstants";
import {AuthenticatedHttpService} from "../configuration/custom/AuthenticatedHttpService";
import {EnquiryComponent} from "./enquiry/enquiry.component";
import {Angular2SocialLoginModule} from "angular2-social-login";
import {SocialMediaService} from "../services/socialmedia/SocialMediaService";

let providers = {
    "facebook": {
        "clientId": "601221530001908",
        "apiVersion": "v2.11" //like v2.4
    }
};

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(PagesRoutes),
        ReactiveFormsModule,
        HttpModule,
        Angular2SocialLoginModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        PricingComponent,
        LockComponent,
        EnquiryComponent
    ],
    providers: [
        AuthService, AppConstants, Store, SocialMediaService,
        {provide: Http, useClass: AuthenticatedHttpService}
    ]
})

export class PagesModule {
}

Angular2SocialLoginModule.loadProvidersScripts(providers);
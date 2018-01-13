import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "../../util/Store";
import {AuthService} from "../../configuration/AuthService";
import {AUTH} from "../../util/Constants";
import {NotificationUtils} from "../../util/NotificationUtil";
import {CommonUtilService} from "../../util/CommonUtilService";
import {AppComponent} from "../../app.component";
import {SocialMediaService} from "../../services/socialmedia/SocialMediaService";

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {

    private user: any;
    private sub: any;
    test: Date = new Date();

    private loading: boolean = false;
    private status: any;

    constructor(private router: Router,
                private store: Store,
                private authService: AuthService,
                private notify: NotificationUtils,
                private commonUtil: CommonUtilService,
                private appComp: AppComponent,
                private socialAuth: SocialMediaService) {
        this.appComp.timeout();
        this.user = {
            username: null,
            password: null
        };
    }

    checkFullPageBackgroundImage() {
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if (image_src !== undefined) {
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    ngOnInit() {
        this.checkFullPageBackgroundImage();

        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700);
    }

    login() {
        this.loading = true;
        this.status = 'Authenticating User..';
        this.authService.doAuthentication(this.user)
            .subscribe(
                res => {
                    if (res) {
                        let data = res.json();
                        this.storeData(data);
                        this.status = 'User verification success !';
                        this.authService.findUser(this.user.username)
                            .subscribe(user => {
                                this.status = 'Configuration & User privileges checking..';
                                if (user.registered) {
                                    this.appComp.reset();
                                    this.status = 'Authentication success!';
                                    this.router.navigate(['/dashboard']);
                                    this.notify.success(this.commonUtil.findDayStatus() + ' ' + this.store.getData(AUTH.userFullname) + '! Welcome to the edgeVantage!');
                                } else {
                                    this.router.navigate(['pages/register']);
                                }
                            });
                    } else {
                        this.router.navigate(['/pages/login']);
                        this.notify.error('The username/password combination is not valid!');
                        this.loading = false;
                        setTimeout(function () {
                            // after 1000 ms we add the class animated to the login/register card
                            $('.card').removeClass('card-hidden');
                        }, 250);
                    }
                },
                error => {
                    this.router.navigate(['/pages/login']);
                    this.notify.error('The username/password combination is not valid!');
                    this.loading = false;
                    setTimeout(function () {
                        // after 1000 ms we add the class animated to the login/register card
                        $('.card').removeClass('card-hidden');
                    }, 250);
                }
            );
    }

    storeData(data: any) {
        if (data) {
            this.store.setData(AUTH.token, data.token);
            this.store.setData(AUTH.refreshToken, data.refreshToken);
            this.store.setData(AUTH.prefix, data.prefix);
            this.store.setData(AUTH.expiration, data.expirationDate);
            this.store.setData(AUTH.userFullname, data.userFullname);
            this.store.setData(AUTH.username, this.user.username);
            this.store.setData(AUTH.admin, null);
        }
    }

    socialLogin(provider) {
        this.sub = this.socialAuth.login(provider);
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}

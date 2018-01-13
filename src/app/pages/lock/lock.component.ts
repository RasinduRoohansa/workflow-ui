import {Component, OnInit} from '@angular/core';
import {Store} from "../../util/Store";
import {Router} from "@angular/router";
import {AppConstants} from "../../configuration/AppConstants";
import {AuthService} from "../../configuration/AuthService";
import {AUTH, SYSTEM} from "../../util/Constants";
import {NotificationUtils} from "../../util/NotificationUtil";
import {CommonUtilService} from "../../util/CommonUtilService";
import {AppComponent} from "../../app.component";

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'lock-cmp',
    templateUrl: './lock.component.html'
})

export class LockComponent implements OnInit {
    test: Date = new Date();

    private userFullName: string;
    private user = {
        username: null,
        password: null
    };

    constructor(private router: Router,
                private store: Store,
                private appConstant: AppConstants,
                private authService: AuthService,
                private notify: NotificationUtils,
                private commonUtil: CommonUtilService,
                private appComp: AppComponent) {
        this.appComp.timeout();
        this.user.username = store.getData(AUTH.username);
        this.userFullName = store.getData(AUTH.userFullname);
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
        }, 700)
    }

    unlock() {
        this.authService.doAuthentication(this.user)
            .subscribe(
                res => {
                    if (res) {
                        this.appComp.reset();
                        let data = res.json();
                        this.storeData(data);
                        this.navigateToCurrentLocation(this.store.getData(SYSTEM.curLocation));
                        this.notify.success(this.commonUtil.findDayStatus() + ' ' + this.store.getData(AUTH.userFullname) + '! edgeVantage has been unlocked!');
                    } else {
                        this.router.navigate([this.appConstant.lockURL]);
                        this.notify.error('The password is not valid!');
                    }
                },
                error => {
                    this.router.navigate([this.appConstant.lockURL]);
                    this.notify.error('The password is not valid!');
                }
            );
    }

    navigateToCurrentLocation(url) {
        let urls = url.replace('?', '${separator}').split('${separator}');
        console.log(urls);
        if (urls.length == 1) {
            this.router.navigate([urls[0]]);
        } else {
            this.router.navigate([urls[0]]);
            // let params = JSON.parse('{"' + urls[1].replace('=', '":"') + '"}');

            // this.router.navigate([urls[0]], {
            //     queryParams: params
            // });
        }
    }

    storeData(data: any) {
        if (data) {
            this.store.setData(AUTH.token, data.token);
            this.store.setData(AUTH.refreshToken, data.refreshToken);
            this.store.setData(AUTH.prefix, data.prefix);
            this.store.setData(AUTH.expiration, data.expirationDate);
            this.store.setData(AUTH.userFullname, data.userFullname);
            this.store.setData(AUTH.username, this.user.username);
        }
    }

    navigateToLogin() {
        this.store.clearStore();
        this.router.navigate([this.appConstant.loginURL]);
    }
}

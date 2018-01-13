import {Injectable} from "@angular/core";
import {AuthService} from "angular2-social-login";
import {Store} from "../../util/Store";
import {AUTH} from "../../util/Constants";
import {UserService} from "../user/UserService";
import {AppComponent} from "../../app.component";
import {Router} from "@angular/router";
import {NotificationUtils} from "../../util/NotificationUtil";
import {CommonUtilService} from "../../util/CommonUtilService";

@Injectable()
export class SocialMediaService {
    private user = {
        email: null,
        username: null
    };

    constructor(private auth: AuthService,
                private store: Store,
                private userService: UserService,
                private notify: NotificationUtils,
                private commonUtil: CommonUtilService,
                private router: Router,
                private appComp: AppComponent) {

    }

    login(provider: any) {
        return this.auth.login(provider)
            .subscribe((data: any) => {
                    var v = {
                        email: data.email,
                        provider: data.provider
                    };
                    this.userService.findUserByEmail(v).subscribe(res => {
                        if (res.token) {
                            this.storeData(res);
                            this.appComp.reset();
                            this.router.navigate(['/dashboard']);
                            this.notify.success(this.commonUtil.findDayStatus() + ' ' + this.store.getData(AUTH.userFullname) + '! Welcome to the edgeVantage!');
                        } else {
                            this.notify.error('Invalid authentication! please contact system administrator.');
                        }
                    });
                }, (error: any) => {
                    this.notify.error(error.message);
                }
            )
    }

    loginUser(provider: any, user: any) {
        return this.auth.login(provider).subscribe(
            (data: any) => {
                user.email = data.email;

                var name = data.name;
                var names = name.split(' ');

                var firstname = '';
                var lastname;
                for (var i = 0; i < names.length - 1; i++) {
                    firstname += names[i] + ' ';
                }
                if (names.length > 1) {
                    lastname = names[names.length - 1];
                }

                user.firstname = firstname;
                user.lastname = lastname;
                user.provider = data.provider;
            }
        )
    }

    logout() {
        this.auth.logout().subscribe(
            (data) => {

            }
        )
    }

    storeData(data: any) {
        if (data) {
            this.store.setData(AUTH.token, data.token);
            this.store.setData(AUTH.refreshToken, data.refreshToken);
            this.store.setData(AUTH.prefix, data.prefix);
            this.store.setData(AUTH.expiration, data.expirationDate);
            this.store.setData(AUTH.userFullname, data.userFullname);
            this.store.setData(AUTH.username, data.username);
            this.store.setData(AUTH.admin, null);
        }
    }

}
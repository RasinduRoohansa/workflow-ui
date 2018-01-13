import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {Store} from "../util/Store";
import {AUTH} from "../util/Constants";
import {AppConstants} from "./AppConstants";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private store: Store,
                private appConstants: AppConstants) {
    }

    canActivate() {
        if (this.store.getData(AUTH.token)) {
            return true;
        } else if (this.store.getData(AUTH.username)) {
            this.router.navigate([this.appConstants.lockURL]);
            return false;
        }
        this.router.navigate([this.appConstants.loginURL]);
        return false;
    }
}

import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Store} from "../util/Store";
import {AppConstants} from "./AppConstants";
import {HttpService} from "./HttpService";


@Injectable()
export class AuthService {

    private authURL: string;

    constructor(private http: Http,
                private store: Store,
                private appConstant: AppConstants,
                private httpService: HttpService) {
        this.authURL = appConstant.authURL;
    }

    doAuthentication(user) {
        let url = this.authURL + '/login';
        let headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(url, user, {
            headers: headers
        }).map(res => {
            if (res.status == 200) {
                return res;
            } else {
                return res;
            }
        });
    }

    doLogout() {
        this.store.clearStore();
    }

    findUser(data: string) {
        let url = this.appConstant.baseURL + this.appConstant.findUser;
        return this.httpService.httpGet(url.replace('${username}', data));
    }

    updateUser(user) {
        let url = this.appConstant.baseURL + this.appConstant.updateUser;
        return this.httpService.httpPost(url, user);
    }
}

import {
    Headers, Http, Request, RequestOptions, RequestOptionsArgs, Response, ResponseOptions,
    XHRBackend
} from "@angular/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import {Store} from "../../util/Store";
import {AUTH} from "../../util/Constants";
import {AppConstants} from "../AppConstants";

/**
 * @author Stelan Briyan
 */

@Injectable()
export class AuthenticatedHttpService extends Http {

    constructor(backend: XHRBackend,
                defaultOptions: RequestOptions,
                private _router: Router,
                private _store: Store,
                private _appConstants: AppConstants) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options).catch((error: Response) => {
            if ((error.status == 401 || error.status == 403)) {
                let inputData = {
                    refreshToken: this._store.getData(AUTH.refreshToken)
                };
                this.getRefreshToken(inputData)
                    .subscribe(
                        data => {
                            if (data && data.json().token) {
                                this._store.setData(AUTH.token, data.json().token);
                                let request: Request = url instanceof Request ? url : null;
                                if (request && AUTH.prefix && AUTH.token) {
                                    request.headers.append('Authorization', this._store.getData(AUTH.prefix) + ' ' + this._store.getData(AUTH.token));
                                }
                            } else {
                                this._store.clearStore();
                                this._router.navigate(['/pages/login']);
                            }
                        },
                        error => {

                        });
            }
            return new Observable<Response>();
        });
    }

    getRefreshToken(data) {
        let headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.post(this._appConstants.refreshTokenURL, data,
            {
                headers: headers
            })
            .map(res => {
                if (res.status == 200) {
                    return res;
                } else {
                    return res;
                }
            });
    }
}

import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Store} from "../util/Store";
import {AUTH} from "../util/Constants";

/**
 * @author Stelan Briyan
 */

const store = new Store();

const globalRequestOptions = new RequestOptions({
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    withCredentials: true
});
const globalMultipartRequestOptions = new RequestOptions({
    headers: new Headers({
        'enctype': 'multipart/form-data'
    }),
    withCredentials: true
});

const RETRIES_COUNT: number = 1;

@Injectable()
export class HttpService {

    constructor(private _http: Http) {
    }

    httpGet(url: string, reqCount?: number): any {
        this.setAuthorization();
        if (!reqCount) {
            reqCount = 1;
        } else {
            reqCount++;
        }
        return this._http.get(url, globalRequestOptions)
            .map(res => this.handleResponse(res))
            .catch((error: any) => this.handleError(error, url, 'GET', reqCount));
    }

    httpPostMultipart(url: string, body: any, reqCount?: number): any {
        this.setMultipartAuthorization();
        if (!reqCount) {
            reqCount = 1;
        } else {
            reqCount++;
        }
        return this._http.post(url, body, globalMultipartRequestOptions)
            .map(res => this.handleResponse(res))
            .catch((error: any) => this.handleError(error, url, 'POST', reqCount, body));
    }

    httpPost(url: string, body: any, reqCount?: number): any {
        this.setAuthorization();
        if (!reqCount) {
            reqCount = 1;
        } else {
            reqCount++;
        }
        return this._http.post(url, body, globalRequestOptions)
            .map(res => this.handleResponse(res))
            .catch((error: any) => this.handleError(error, url, 'POST', reqCount, body));
    }

    httpPut(url: string, body: any, reqCount?: number): any {
        this.setAuthorization();
        if (!reqCount) {
            reqCount = 1;
        } else {
            reqCount++;
        }
        return this._http.put(url, body, globalRequestOptions)
            .map(res => this.handleResponse(res))
            .catch((error: any) => this.handleError(error, url, 'PUT', reqCount, body));
    }

    setAuthorization() {
        globalRequestOptions.headers.delete('Authorization');
        if (store.getData(AUTH.prefix) && store.getData(AUTH.token)) {
            globalRequestOptions.headers.append('Authorization', store.getData(AUTH.prefix) + ' ' + store.getData(AUTH.token));
        }
    }

    setMultipartAuthorization() {
        globalMultipartRequestOptions.headers.delete('Authorization');
        if (store.getData(AUTH.prefix) && store.getData(AUTH.token)) {
            globalMultipartRequestOptions.headers.append('Authorization', store.getData(AUTH.prefix) + ' ' + store.getData(AUTH.token));
        }
    }

    private handleResponse(res: any) {
        if (res) {
            if (res.status == 200) {
                return res.text() ? res.json() : {};
            } else if (res.status == 401 || res.status == 403) {
                return null;
            } else {
                // return res.json().message;
            }
        }
    }

    private handleError(error: any, url: string, method: string, reqCount?: number, body?: any) {
        if (reqCount <= RETRIES_COUNT) {
            switch (method) {
                case 'GET':
                    return this.httpGet(url, reqCount);
                case 'POST':
                    return this.httpPost(url, body, reqCount);
                case 'PUT':
                    return this.httpPut(url, body, reqCount);
            }
        }
        return Observable.throw(error || 'Internal server error');
    }
}

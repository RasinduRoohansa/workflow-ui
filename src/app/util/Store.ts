import {Injectable} from "@angular/core";

/**
 * @author Stelan Briyan
 */

/**
 * Class Store is used for store data in session storage and also that data encrypting from here.
 */
@Injectable()
export class Store {

    getData(key: string): string {
        let value = sessionStorage.getItem(key);
        if (value) {
            return atob(value);
        }
        return null;
    }

    setData(key: string, value: string) {
        sessionStorage.setItem(key, btoa(value));
    }

    removeData(key: string) {
        sessionStorage.removeItem(key);
    }

    clearStore() {
        sessionStorage.clear();
    }
}

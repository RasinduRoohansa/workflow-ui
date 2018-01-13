import {Injectable} from "@angular/core";

declare var $: any;

@Injectable()
export class CommonUtilService {

    findDayStatus() {
        var today = new Date()
        var curHr = today.getHours()

        if (curHr < 12) {
            return 'Good morning'
        } else if (curHr < 18) {
            return 'Good afternoon';
        } else {
            return 'Good evening';
        }
    }
}
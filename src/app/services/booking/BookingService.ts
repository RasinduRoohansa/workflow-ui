import {Injectable} from "@angular/core";
import {HttpService} from "../../configuration/HttpService";
import {AppConstants} from "../../configuration/AppConstants";
import {Store} from "../../util/Store";
import {AUTH} from "../../util/Constants";

@Injectable()
export class BookingService {
    constructor(private httpService: HttpService,
                private appConstant: AppConstants,
                private store: Store) {

    }

    createBookingByWalkThrough(booking: any) {
        let url = this.appConstant.baseURL + this.appConstant.createBookingByWalkThrough;
        return this.httpService.httpPost(url, booking);
    }

    findAllBookings() {
        let url = this.appConstant.baseURL + this.appConstant.findAllBooking;
        return this.httpService.httpGet(url);
    }

    findNextBooking() {
        let url = this.appConstant.baseURL + this.appConstant.findNextBooking;
        return this.httpService.httpGet(url);
    }

    findBookingById(fkBooking: any) {
        let url = this.appConstant.baseURL + this.appConstant.findBookingById;
        return this.httpService.httpGet(url.replace('${id}', fkBooking));
    }

    uploadTablePlan(file: any, fkBooking: any) {
        let username = this.store.getData(AUTH.username);
        let url = this.appConstant.baseURL + this.appConstant.uploadTablePlan;
        return this.httpService.httpPostMultipart(
            url.replace('${fkBooking}', fkBooking)
                .replace('${username}', username), file);
    }

    findTablePlanHeader(fkBooking: any) {
        let url = this.appConstant.baseURL + this.appConstant.findTablePlanHeader;
        return this.httpService.httpGet(url.replace('${fkBooking}', fkBooking));
    }

    findTablePlan(fkDocument: any) {
        let url = this.appConstant.baseURL + this.appConstant.findTablePlan;
        return this.httpService.httpGet(url.replace('${fkDocument}', fkDocument));
    }

    createBookingCheckListTemplate(result: any) {
        let url = this.appConstant.baseURL + this.appConstant.createBookingCheckListTemplate;
        return this.httpService.httpPost(url, result);
    }

    findBookingCheckListTemplate(fkBooking: any) {
        let url = this.appConstant.baseURL + this.appConstant.findBookingCheckListTemplate;
        return this.httpService.httpGet(url.replace('${fkBooking}', fkBooking));
    }

    findBookingCheckListTemplateItem(fkBooking: any) {
        let url = this.appConstant.baseURL + this.appConstant.findBookingCheckListTemplateItem;
        return this.httpService.httpGet(url.replace('${fkBooking}', fkBooking));
    }

    checkBookingCheckListItemDone(fkId: any) {
        let url = this.appConstant.baseURL + this.appConstant.checkBookingCheckListItemDone;
        return this.httpService.httpGet(url.replace('${fkId}', fkId));
    }

    saveBookingCheckListItem(result: any) {
        let url = this.appConstant.baseURL + this.appConstant.saveBookingCheckListItem;
        return this.httpService.httpPost(url, result);
    }
}
import {Injectable} from "@angular/core";
import {HttpService} from "../../configuration/HttpService";
import {AppConstants} from "../../configuration/AppConstants";

@Injectable()
export class EnquiryService {
    constructor(private httpService: HttpService,
                private appConstant: AppConstants) {

    }

    getNotAllocatedEnquiry() {
        let url = this.appConstant.baseURL + this.appConstant.getNotAllocatedEnquiry;
        return this.httpService.httpGet(url);
    }

    findImage(fkDocument: any) {
        let url = this.appConstant.baseURL + this.appConstant.findImage;
        return this.httpService.httpGet(url.replace('${id}', fkDocument));
    }

    allocateEnquiry(enquiryAllocation) {
        let url = this.appConstant.baseURL + this.appConstant.allocateEnquiry;
        return this.httpService.httpPost(url, enquiryAllocation);
    }

    getAllocatedEnquiry() {
        let url = this.appConstant.baseURL + this.appConstant.getAllocatedEnquiry;
        return this.httpService.httpGet(url);
    }

    getAllocatedEnquiryByUsers(username: string) {
        let url = this.appConstant.baseURL + this.appConstant.getAllocatedEnquiryByUsers;
        return this.httpService.httpGet(url.replace('${username}', username));
    }

    getEnquiry(status) {
        let url = this.appConstant.baseURL + this.appConstant.getEnquiry;
        return this.httpService.httpGet(url.replace('${status}', status));
    }

    findEnquiryById(enquiryId: any) {
        let url = this.appConstant.baseURL + this.appConstant.findEnquiryById;
        return this.httpService.httpGet(url.replace('${id}', enquiryId));
    }

    reserveTimeWalkThrough(walkthrough: any) {
        let url = this.appConstant.baseURL + this.appConstant.reserveTimeWalkThrough;
        return this.httpService.httpPost(url, walkthrough);
    }

    findReserveTimeWalkThrough(fkEnquiry) {
        let url = this.appConstant.baseURL + this.appConstant.findReserveTimeWalkThrough;
        return this.httpService.httpGet(url.replace('${id}', fkEnquiry));
    }

    allocateDriver(driverAllocation) {
        let url = this.appConstant.baseURL + this.appConstant.allocateDriver;
        return this.httpService.httpPost(url, driverAllocation);
    }

    getAllocatedDriver(status) {
        let url = this.appConstant.baseURL + this.appConstant.getAllocatedDriver;
        return this.httpService.httpGet(url.replace('${status}', status));
    }

    unAllocateTransport(enquiry) {
        let url = this.appConstant.baseURL + this.appConstant.unAllocateTransport;
        return this.httpService.httpPost(url, enquiry);
    }

    getTransportVoucherList() {
        let url = this.appConstant.baseURL + this.appConstant.getTransportVoucherList;
        return this.httpService.httpGet(url);
    }

    findActLogByEnquiryId(fkEnquiry: any) {
        let url = this.appConstant.baseURL + this.appConstant.findActLogByEnquiryId;
        return this.httpService.httpGet(url.replace('${id}', fkEnquiry));
    }

    getEnquiryByWalkThroughId(fkWalkThrough: any) {
        let url = this.appConstant.baseURL + this.appConstant.getEnquiryByWalkThroughId;
        return this.httpService.httpGet(url.replace('${id}', fkWalkThrough));
    }
}
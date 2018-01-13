import {Injectable} from "@angular/core";
import {HttpService} from "../../configuration/HttpService";
import {AppConstants} from "../../configuration/AppConstants";

declare var swal: any;
declare var $: any;

@Injectable()
export class DashboardService {
    constructor(private httpService: HttpService,
                private appConstant: AppConstants) {

    }

    findDashboardSummery() {
        let url = this.appConstant.baseURL + this.appConstant.findDashboardSummery;
        return this.httpService.httpGet(url);
    }

    findMaker(mapLocation: any) {

        let marker = [];

        mapLocation.forEach(res => {
            marker.push({
                lat: res.lat,
                lng: res.lng
            });
        });

        return marker;
    }
}
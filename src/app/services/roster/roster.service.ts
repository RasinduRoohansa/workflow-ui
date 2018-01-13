import { Injectable } from '@angular/core';
import { HttpService } from 'app/configuration/HttpService';
import { AppConstants } from 'app/configuration/AppConstants';

@Injectable()
export class RosterService {
  constructor(private httpService: HttpService,
    private appConstant: AppConstants) { }

  findAllBookings() {
    let url = this.appConstant.baseURL + this.appConstant.findAllBookings;
    return this.httpService.httpGet(url);
  }

  getAllAvaiableEmployees(empType){
    let url = this.appConstant.baseURL + this.appConstant.getAllAvailableEmployees+empType;
    return this.httpService.httpGet(url);
  }

  getEventDetails(id){
    let url = this.appConstant.baseURL + this.appConstant.getEventDetails+id;
    return this.httpService.httpGet(url);
  }

  saveEmployeeMapper(emp){
    let url = this.appConstant.baseURL + this.appConstant.saveEmployeeMapper;
    return this.httpService.httpPost(url, emp);
  }

}

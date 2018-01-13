import { Injectable } from '@angular/core';
import { AppConstants } from 'app/configuration/AppConstants';
import { HttpService } from 'app/configuration/HttpService';

@Injectable()
export class EmployeeService {

  constructor(private httpService: HttpService,
    private appConstant: AppConstants) { }

  saveEmployee(emp){
    let url = this.appConstant.baseURL + this.appConstant.saveEmployee;
    return this.httpService.httpPost(url, emp);
  }

  findAllEmployees() {
    let url = this.appConstant.baseURL + this.appConstant.findAllEmployees;
    return this.httpService.httpGet(url);
  }

  filterEmployees(keyword){
    let url = this.appConstant.baseURL + this.appConstant.filterEmployees+keyword;
    return this.httpService.httpGet(url);
  }

  updateEmployee(emp){
    let url = this.appConstant.baseURL + this.appConstant.updateEmployee;
    return this.httpService.httpPost(url, emp);
  }

  findAllEmployeeTypes() {
    let url = this.appConstant.baseURL + this.appConstant.findAllEmployeeTypes;
    return this.httpService.httpGet(url);
  }

  findEmployeeByID(id){
    let url = this.appConstant.baseURL + this.appConstant.findEmployeeByID+id;
    return this.httpService.httpGet(url);
  }
  

}

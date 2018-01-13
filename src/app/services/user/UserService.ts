import {Injectable} from "@angular/core";
import {HttpService} from "../../configuration/HttpService";
import {AppConstants} from "../../configuration/AppConstants";

@Injectable()
export class UserService {
    constructor(private httpService: HttpService,
                private appConstant: AppConstants) {

    }

    findAllUsers() {
        let url = this.appConstant.baseURL + this.appConstant.findAllUsers;
        return this.httpService.httpGet(url);
    }

    deactivateUser(id) {
        let url = this.appConstant.baseURL + this.appConstant.deactivateUser;
        return this.httpService.httpGet(url.replace('${id}', id));
    }

    activateUser(id) {
        let url = this.appConstant.baseURL + this.appConstant.activateUser;
        return this.httpService.httpGet(url.replace('${id}', id));
    }

    saveRole(role) {
        let url = this.appConstant.baseURL + this.appConstant.saveRole;
        return this.httpService.httpPost(url, role);
    }

    findActiveUsers() {
        let url = this.appConstant.baseURL + this.appConstant.findActiveUsers;
        return this.httpService.httpGet(url);
    }

    findActiveRole() {
        let url = this.appConstant.baseURL + this.appConstant.findActiveRole;
        return this.httpService.httpGet(url);
    }

    findUserRoleMapper(selectedUser: any) {
        let url = this.appConstant.baseURL + this.appConstant.findUserRoleMapper;
        return this.httpService.httpGet(url.replace('${id}', selectedUser));
    }

    assignRole(role: any, selectedUser: any, checked) {
        let url = this.appConstant.baseURL + this.appConstant.assignRole;
        return this.httpService.httpGet(url
            .replace('${roleId}', role)
            .replace('${userId}', selectedUser)
            .replace('${status}', checked));
    }

    findMenus(selectedRoleToAssign: any) {
        let url = this.appConstant.baseURL + this.appConstant.findMenus;
        return this.httpService.httpGet(url
            .replace('${roleId}', selectedRoleToAssign));
    }

    assignToRole(id, selectedRoleToAssign: any, selected) {
        let url = this.appConstant.baseURL + this.appConstant.assignMenuToRole;
        return this.httpService.httpGet(url
            .replace('${roleId}', selectedRoleToAssign,)
            .replace('${menuId}', id)
            .replace('${status}', selected));
    }

    assignSubmenuToRole(id, selectedRoleToAssign: any, selected) {
        let url = this.appConstant.baseURL + this.appConstant.assignSubMenuToRole;
        return this.httpService.httpGet(url
            .replace('${roleId}', selectedRoleToAssign,)
            .replace('${submenuId}', id)
            .replace('${status}', selected));
    }

    saveUser(user) {
        let url = this.appConstant.baseURL + this.appConstant.saveUser;
        return this.httpService.httpPost(url, user);
    }

    findAccessCode(username: string) {
        let url = this.appConstant.baseURL + this.appConstant.findAccessCode;
        return this.httpService.httpGet(url.replace('${username}', username));
    }

    findUsersByAccessCode(code: string) {
        let url = this.appConstant.baseURL + this.appConstant.findUsersByAccessCode;
        return this.httpService.httpGet(url.replace('${code}', code));
    }

    findSystemFeaturesByUser(fkUser: any) {
        let url = this.appConstant.baseURL + this.appConstant.findSystemFeaturesByUser;
        return this.httpService.httpGet(url.replace('${fkUser}', fkUser));
    }

    findSystemFeatures() {
        let url = this.appConstant.baseURL + this.appConstant.findSystemFeatures;
        return this.httpService.httpGet(url);
    }

    findPrivillegesByUserId(id) {
        let url = this.appConstant.baseURL + this.appConstant.findPrivillegesByUserId;
        return this.httpService.httpGet(url.replace('${fkUser}', id));
    }

    savePrivileges(grant) {
        let url = this.appConstant.baseURL + this.appConstant.savePrivileges;
        return this.httpService.httpPost(url, grant);
    }

    deletePrivilege(id) {
        let url = this.appConstant.baseURL + this.appConstant.deletePrivilege;
        return this.httpService.httpGet(url.replace('${id}', id));
    }

    findUsersByRoleGroup(roleName: string) {
        let url = this.appConstant.baseURL + this.appConstant.findUsersByRoleGroup;
        return this.httpService.httpGet(url.replace('${code}', roleName));
    }

    findUserByEmail(v: any) {
        return this.httpService.httpPost(this.appConstant.socialLogin, v);
    }
}
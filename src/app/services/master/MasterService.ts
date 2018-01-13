import {Injectable} from "@angular/core";
import {HttpService} from "../../configuration/HttpService";
import {AppConstants} from "../../configuration/AppConstants";

@Injectable()
export class MasterService {
    constructor(private httpService: HttpService,
                private appConstant: AppConstants) {

    }

    saveEventType(eventType: {}) {
        let url = this.appConstant.baseURL + this.appConstant.saveEventType;
        return this.httpService.httpPost(url, eventType);
    }

    findAllEventTypes() {
        let url = this.appConstant.baseURL + this.appConstant.findAllEventTypes;
        return this.httpService.httpGet(url);
    }

    updateEventType(event: any) {
        let url = this.appConstant.baseURL + this.appConstant.updateEventType;
        return this.httpService.httpPost(url, event);
    }

    saveVenue(venue: {}) {
        let url = this.appConstant.baseURL + this.appConstant.saveVenue;
        return this.httpService.httpPost(url, venue);
    }

    findAllVenue() {
        let url = this.appConstant.baseURL + this.appConstant.findAllVenue;
        return this.httpService.httpGet(url);
    }

    saveVenueSpace(space: any) {
        let url = this.appConstant.baseURL + this.appConstant.saveVenueSpace;
        return this.httpService.httpPost(url, space);
    }

    findVenueSpace(id) {
        let url = this.appConstant.baseURL + this.appConstant.findVenueSpace;
        return this.httpService.httpGet(url.replace('${fkVenue}', id));
    }

    saveCategory(category: any) {
        let url = this.appConstant.baseURL + this.appConstant.saveCategory;
        return this.httpService.httpPost(url, category);
    }

    findActiveCategory() {
        let url = this.appConstant.baseURL + this.appConstant.findActiveCategory;
        return this.httpService.httpGet(url);
    }

    saveItem(item: any) {
        let url = this.appConstant.baseURL + this.appConstant.saveItem;
        return this.httpService.httpPost(url, item);
    }

    findItem() {
        let url = this.appConstant.baseURL + this.appConstant.findItem;
        return this.httpService.httpGet(url);
    }

    findItemByCategory(id: any) {
        let url = this.appConstant.baseURL + this.appConstant.findItemByCategory;
        return this.httpService.httpGet(url.replace('${fkCategory}', id));
    }

    saveSupplier(supplier: any) {
        let url = this.appConstant.baseURL + this.appConstant.saveSupplier;
        return this.httpService.httpPost(url, supplier);
    }

    findAllSupplier() {
        let url = this.appConstant.baseURL + this.appConstant.findAllSupplier;
        return this.httpService.httpGet(url);
    }

    saveImageForVenueSpace(img: any) {
        let url = this.appConstant.baseURL + this.appConstant.saveImageForVenueSpace;
        return this.httpService.httpPost(url, img);
    }

    findImage(fkDocument: any) {
        let url = this.appConstant.baseURL + this.appConstant.findImage;
        return this.httpService.httpGet(url.replace('${id}', fkDocument));
    }

    updateVenueSpace(space: any) {
        let url = this.appConstant.baseURL + this.appConstant.updateVenueSpace;
        return this.httpService.httpPost(url, space);
    }

    findVenueSpaceBySpaceId(spaceId: any) {
        let url = this.appConstant.baseURL + this.appConstant.findVenueSpaceBySpaceId;
        return this.httpService.httpGet(url.replace('${fkSpace}', spaceId));
    }

    saveFacility(facility: { facility: string; createdBy: string; fkVenueSpace: any }) {
        let url = this.appConstant.baseURL + this.appConstant.facility;
        return this.httpService.httpPost(url, facility);
    }

    findFacility(spaceId: any) {
        let url = this.appConstant.baseURL + this.appConstant.findFacility;
        return this.httpService.httpGet(url.replace('${spaceId}', spaceId));
    }

    findActiveEventTypes() {
        let url = this.appConstant.baseURL + this.appConstant.findActiveEventTypes;
        return this.httpService.httpGet(url);
    }

    findActiveSupplier() {
        let url = this.appConstant.baseURL + this.appConstant.findActiveSupplier;
        return this.httpService.httpGet(url);
    }

    createPackage(supplierPackage) {
        let url = this.appConstant.baseURL + this.appConstant.createPackage;
        return this.httpService.httpPost(url, supplierPackage);
    }

    getAllPackages() {
        let url = this.appConstant.baseURL + this.appConstant.getAllPackages;
        return this.httpService.httpGet(url);
    }

    activateVenueSpace(id: any) {
        let url = this.appConstant.baseURL + this.appConstant.activateVenueSpace;
        return this.httpService.httpGet(url.replace('${id}', id));
    }

    deactivateVenueSpace(id: any) {
        let url = this.appConstant.baseURL + this.appConstant.deactivateVenueSpace;
        return this.httpService.httpGet(url.replace('${id}', id));
    }

    findPackageById(packageId: any) {
        let url = this.appConstant.baseURL + this.appConstant.findPackageById;
        return this.httpService.httpGet(url.replace('${id}', packageId));
    }

    savePackageItem(droppedItems: any) {
        let url = this.appConstant.baseURL + this.appConstant.savePackageItem;
        return this.httpService.httpPost(url, droppedItems);
    }

    findPackageItem(packageId: any) {
        let url = this.appConstant.baseURL + this.appConstant.findPackageItem;
        return this.httpService.httpGet(url.replace('${id}', packageId));
    }

    findSystemTax() {
        let url = this.appConstant.baseURL + this.appConstant.findSystemTax;
        return this.httpService.httpGet(url);
    }

    deactivatePackage(id) {
        let url = this.appConstant.baseURL + this.appConstant.deactivatePackage;
        return this.httpService.httpGet(url.replace('${id}', id));
    }

    activatePackage(id) {
        let url = this.appConstant.baseURL + this.appConstant.activatePackage;
        return this.httpService.httpGet(url.replace('${id}', id));
    }

    findAllDriver() {
        let url = this.appConstant.baseURL + this.appConstant.findAllDriver;
        return this.httpService.httpGet(url);
    }

    saveDriver(driver: any) {
        let url = this.appConstant.baseURL + this.appConstant.saveDriver;
        return this.httpService.httpPost(url, driver);
    }
    findActiveDriver() {
        let url = this.appConstant.baseURL + this.appConstant.findActiveDriver;
        return this.httpService.httpGet(url);
    }

    saveImageForPackages(img: any) {
        let url = this.appConstant.baseURL + this.appConstant.saveImageForPackages;
        return this.httpService.httpPost(url, img);
    }

    findActiveMasterMainMenuCategories() {
        let url = this.appConstant.baseURL + this.appConstant.findActiveMasterMainMenuCategories;
        return this.httpService.httpGet(url);
    }

    findActiveMasterSubMenuCategories(fkMasterMainItemCategoryId: any) {
        let url = this.appConstant.baseURL + this.appConstant.findActiveMasterSubMenuCategories;
        return this.httpService.httpGet(url.replace('${id}', fkMasterMainItemCategoryId));
    }

    saveFoodMenuItem(foodMenuItem: any) {
        let url = this.appConstant.baseURL + this.appConstant.saveFoodMenuItem;
        return this.httpService.httpPost(url, foodMenuItem);
    }

    findAllActiveMenuItems() {
        let url = this.appConstant.baseURL + this.appConstant.findAllActiveMenuItems;
        return this.httpService.httpGet(url);
    }


    saveMasterMenu(masterMenu: any) {
        let url = this.appConstant.baseURL + this.appConstant.saveMasterMenu;
        return this.httpService.httpPost(url, masterMenu);
    }

    findActiveAllMenus() {
        let url = this.appConstant.baseURL + this.appConstant.findActiveAllMenus;
        return this.httpService.httpGet(url);
    }

    findPackageImages(packageId: any) {
        let url = this.appConstant.baseURL + this.appConstant.findPackageImages;
        return this.httpService.httpGet(url.replace('${id}', packageId));
    }

    findMenuItemsByMenuId(id: any) {
        let url = this.appConstant.baseURL + this.appConstant.findMenuItemsByMenuId;
        return this.httpService.httpGet(url.replace('${id}', id));
    }

    findCheckListTemplateByEventType(fkEventType: any) {
        let url = this.appConstant.baseURL + this.appConstant.findCheckListTemplateByEventType;
        return this.httpService.httpGet(url.replace('${fkEventType}', fkEventType));
    }
}
import {AfterViewInit, Component} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {DomSanitizer} from "@angular/platform-browser";
import {Store} from "../../../util/Store";
import {AUTH} from "../../../util/Constants";
import {PackageItemService} from "../../../util/package-item/PackageItemService";
import {WalkThroughService} from "../../../services/enquiry/WalkThroughService";
import {NotificationUtils} from "../../../util/NotificationUtil";

export interface ConfirmModel extends AfterViewInit {
    packageData: any;
    fkWalkThrough: number;
}

@Component({
    selector: 'cart-popup',
    templateUrl: './cart-popup.component.html',
    styleUrls: ['cart-popup.component.css']
})
export class CartPopupComponent extends DialogComponent<ConfirmModel, any> implements ConfirmModel {
    packageData: any;
    fkWalkThrough: any;

    private dataSet = {
        qty: 1,
        qtyType: null,
        fkWalkThrough: null,
        createdBy: this.store.getData(AUTH.username),
        fkPackage: null,
        totalCost: 0,
        cost: 0,
        taxRate: 0,
        markup: 0,
        updateMode: false
    };

    private dataExists: any;

    constructor(private _sanitizer: DomSanitizer,
                private store: Store,
                private packageItemService: PackageItemService,
                private walkThroughService: WalkThroughService,
                private notify: NotificationUtils,
                dialogService: DialogService) {
        super(dialogService);
    }

    getImage(image) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(image);
    }

    ngAfterViewInit(): void {
        this.walkThroughService.findCartPackageByIds(this.fkWalkThrough, this.packageData.id)
            .subscribe(res => {
                this.dataExists = res;
                if (this.dataExists.id) {
                    this.notify.warn("Package is already added to the cart !");
                }
            });
    }

    addToCart() {
        this.dataSet.fkPackage = this.packageData.id;
        this.dataSet.qtyType = this.packageData.unitType;
        this.dataSet.totalCost = this.packageItemService.calculateValues(this.packageData.cost, this.packageData.taxRate, this.packageData.markup);
        this.dataSet.cost = this.packageData.cost;
        this.dataSet.taxRate = this.packageData.taxRate;
        this.dataSet.markup = this.packageData.markup;

        this.result = this.dataSet;
        this.close();
    }

    updateQty() {
        this.updateCartPackageQty(this.dataSet.qty);
    }

    addQty() {
        this.updateCartPackageQty(this.dataSet.qty + this.dataExists.qty);
    }

    updateCartPackageQty(qty) {
        this.dataSet.fkPackage = this.packageData.id;
        this.dataSet.qtyType = this.packageData.unitType;
        this.dataSet.totalCost = this.packageItemService.calculateValues(this.packageData.cost, this.packageData.taxRate, this.packageData.markup);
        this.dataSet.cost = this.packageData.cost;
        this.dataSet.taxRate = this.packageData.taxRate;
        this.dataSet.markup = this.packageData.markup;
        this.dataSet.updateMode = true;
        this.dataSet.qty = qty;

        this.result = this.dataSet;
        this.close();
    }
}
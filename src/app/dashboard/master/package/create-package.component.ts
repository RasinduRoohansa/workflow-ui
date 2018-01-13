import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {Store} from "../../../util/Store";
import {MasterService} from "../../../services/master/MasterService";
import {NotificationUtils} from "../../../util/NotificationUtil";
import {DomSanitizer} from "@angular/platform-browser";
import {AUTH} from "../../../util/Constants";
import {CropComponent} from "../../crop/crop.component";

declare var $: any;

export interface ConfirmModel extends AfterViewInit, OnInit {
    selectedPackage: any,
    update: boolean;
}

@Component({
    selector: 'setup-package',
    templateUrl: './create-package.component.html'
})
export class CreatePackageComponent extends DialogComponent<ConfirmModel, any> implements ConfirmModel {
    selectedPackage: any;
    update: boolean;

    private taxEditMode = false;

    private package = {
        id: null,
        packageName: null,
        fkSupplier: null,
        isConfirmed: false,
        createdBy: this.store.getData(AUTH.username),
        description: null,
        unitType: 'Quantity',
        cost: 0,
        taxRate: 0,
        markup: 0,
        qty: 1,
        tax: [],
        update: false,
        image: null,
        fkDocument: null
    };

    private image: any;
    private suppliers: any;
    private packages: any;

    private packageTax = 0;
    private packageMarkup = 0;
    private packageTotal = 0;

    private selectedTax = [];
    private taxList: any;

    constructor(private _sanitizer: DomSanitizer,
                dialogService: DialogService,
                private store: Store,
                private masterService: MasterService,
                private notify: NotificationUtils) {
        super(dialogService);
    }

    ngOnInit(): void {
        $(".selectpicker").selectpicker();
        this.findActiveSupplier();
        this.findSystemTax();

        if (this.update) {
            this.package.description = '_';
            this.package.packageName = '_';
            this.masterService.findPackageById(this.selectedPackage)
                .subscribe(res => {
                    this.package = res;
                    this.selectedTax = this.package.tax;
                    this.calculateTax();

                    if (res.image) {
                        this.image = {
                            image: this._sanitizer.bypassSecurityTrustResourceUrl(res.image)
                        };
                    }

                });
            this.taxEditMode = false;
        }
    }

    selectImg() {
        this.dialogService.addDialog(CropComponent, {
            title: 'Crop Image',
            message: '',
            cwidth: 56,
            cheight: 30,
            croppedWidth: 560,
            croppedHeight: 320
        }).subscribe((res) => {
            if (res) {
                this.package.fkDocument = null;
                this.image = res;
                this.package.image = this.image.image;
            }
        });
    }

    ngAfterViewInit(): void {
    }

    editTaxList() {
        this.taxEditMode = true;
        setTimeout(() => {
            $(".selectpicker").selectpicker('refresh');
        }, 150);
    }

    findSystemTax() {
        this.masterService.findSystemTax()
            .subscribe(res => {
                this.taxList = res;
                setTimeout(() => {
                    $(".selectpicker").selectpicker('refresh');
                }, 150);
            });
    }

    cancel() {
        this.result = this.package;
        this.close();
    }

    createPackage() {
        this.package.update = this.update;
        this.package.tax = this.selectedTax;
        this.masterService.createPackage(this.package)
            .subscribe(res => {
                this.package.id = res;
                this.package.isConfirmed = true;
                this.result = this.package;
                this.close();
            });
    }

    findActiveSupplier() {
        this.masterService.findActiveSupplier()
            .subscribe(res => {
                this.suppliers = res;
                setTimeout(() => {
                    $(".selectpicker").selectpicker('refresh');
                }, 150);
            });
    }

    calculateTax() {
        let taxRate = 0;
        this.selectedTax.forEach(tax => {
            taxRate += parseFloat(tax.taxRate);
        });
        this.package.taxRate = taxRate;
        this.calculateValues();
    }

    calculateValues() {
        console.log(this.package.cost);
        if (this.package.cost) {
            this.getPackageMarkup();
            this.getPackageSalesTax();
            this.getPackageTotal();
        }
    }

    getPackageSalesTax() {
        let costWithMarkup: number = this.packageMarkup + +this.package.cost;
        this.packageTax = (costWithMarkup * this.package.taxRate) / 100;
    }

    getPackageMarkup() {
        this.packageMarkup = (this.package.cost * this.package.markup) / 100;
    }

    getPackageTotal() {
        let cost: number = this.package.cost;
        this.packageTotal = parseFloat(cost.toString()) + parseFloat(this.packageTax.toString()) + parseFloat(this.packageMarkup.toString());
    }
}
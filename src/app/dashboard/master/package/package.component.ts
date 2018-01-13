import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {DialogService} from "ng2-bootstrap-modal";
import {DomSanitizer} from "@angular/platform-browser";
import {CreatePackageComponent} from "./create-package.component";
import {MasterService} from "../../../services/master/MasterService";
import {NotificationUtils} from "../../../util/NotificationUtil";
import {VsimgComponent} from "../venue/vsimg.component";
import {MultipleImgUploadComponent} from "./multiple-img-upload/multiple-img-upload.component";

declare var swal: any;

@Component({
    selector: 'package-item',
    templateUrl: './package.component.html'
})
export class PackageComponent extends OnInit {

    private searchText = '';
    private packages: any;

    constructor(private _sanitizer: DomSanitizer,
                private router: Router,
                private masterService: MasterService,
                private dialogService: DialogService,
                private notify: NotificationUtils) {
        super();
    }

    ngOnInit(): void {
        this.getAllPackages();
    }

    getImage(image) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(image);
    }

    createItemPackage() {
        this.dialogService.addDialog(CreatePackageComponent, {
            update: false
        }).subscribe((result) => {
            //We get dialog result
            if (result.isConfirmed) {
                this.navigateToSetupPage(result.id);
                swal({
                    type: "success",
                    title: "Success!",
                    text: "New package is created successfully!",
                    buttonsStyling: false,
                    confirmButtonText: 'Lets Start!',
                    confirmButtonClass: "btn btn-success"
                });
            } else {

            }
        });
    }

    navigateToSetupPage(id) {
        this.router.navigate(['master/package/setup-package/' + id]);
    }

    getAllPackages() {
        this.masterService.getAllPackages()
            .subscribe(res => {
                this.packages = res;
            });
    }

    calculatePackageTotal(supplierPackage) {
        let packageMarkup = (supplierPackage.cost * supplierPackage.markup) / 100;
        let packageTax = ((parseFloat(packageMarkup.toString()) + parseFloat(supplierPackage.cost.toString())) * supplierPackage.taxRate) / 100;
        return parseFloat(supplierPackage.cost.toString()) + parseFloat(packageTax.toString()) + parseFloat(packageMarkup.toString());
    }

    deactivatePackage(supplierPackage) {
        this.masterService.deactivatePackage(supplierPackage.id)
            .subscribe(res => {
                supplierPackage.activated = false;
                this.notify.warn("Package has been deactivated!");
            });
    }

    activatePackage(supplierPackage) {
        this.masterService.activatePackage(supplierPackage.id)
            .subscribe(res => {
                supplierPackage.activated = true;
                swal({
                    type: "success",
                    title: "Activated!",
                    text: "Package has been activated!",
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success"

                });
            });
    }

    editPackage(supplierPackage) {
        this.dialogService.addDialog(CreatePackageComponent, {
            selectedPackage: supplierPackage.id,
            update: true
        }).subscribe((result) => {

            if (result.isConfirmed) {
                swal({
                    type: "success",
                    title: "Success!",
                    text: "New package is updated successfully!",
                    buttonsStyling: false,
                    confirmButtonText: 'Lets Start!',
                    confirmButtonClass: "btn btn-success"
                });
                this.getAllPackages();
            }

        });
    }

    viewImages(packageDetail) {
        this.dialogService.addDialog(MultipleImgUploadComponent, {
            packageName: packageDetail.packageName,
            packageId: packageDetail.id
        }).subscribe((isConfirmed) => {
            //We get dialog result
            if (isConfirmed) {

            } else {

            }
        });
    }
}
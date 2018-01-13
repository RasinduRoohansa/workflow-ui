import {Component, OnInit} from "@angular/core";
import {AppConstants} from "../../../configuration/AppConstants";
import {AUTH} from "../../../util/Constants";
import {Store} from "../../../util/Store";
import {MasterService} from "../../../services/master/MasterService";

declare var swal: any;

@Component({
    selector: 'supplier',
    templateUrl: './supplier.component.html'
})
export class SupplierComponent extends OnInit {

    private supplier: any;
    private suppliers: any;
    private suppliersTemp: any;
    private searchText = '';
    private addMode: boolean = false;

    constructor(private appConstant: AppConstants,
                private store: Store,
                private masterService: MasterService) {
        super();
    }

    ngOnInit(): void {
        this.supplier = {
            createdBy: this.store.getData(AUTH.username)
        }
        this.findAllSupplier();
    }

    findAllSupplier() {
        this.masterService.findAllSupplier()
            .subscribe(res => {
                this.suppliers = res;
                this.suppliersTemp = res;
            });
    }

    saveSupplier() {
        this.masterService.saveSupplier(this.supplier)
            .subscribe(res => {
                swal({
                    type: "success",
                    title: "Success!",
                    text: "New supplier is added!",
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success"
                });
                this.ngOnInit();
                this.findAllSupplier();
            });
    }

    filterItem() {
        if (this.searchText == '') {
            this.suppliers = this.suppliersTemp;
        } else {
            this.suppliers = this.suppliersTemp.filter(supplier => {
                return (supplier.supplierName && supplier.supplierName.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0)
                    || (supplier.code && supplier.code.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0)
                    || (supplier.companyName && supplier.companyName.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0);
            });
        }
    }


}
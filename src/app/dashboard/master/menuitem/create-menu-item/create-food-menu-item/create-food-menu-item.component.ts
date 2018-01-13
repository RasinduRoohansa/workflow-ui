import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {NotificationUtils} from "../../../../../util/NotificationUtil";
import {MasterService} from "../../../../../services/master/MasterService";
import {Component, OnInit} from "@angular/core";
import {CropComponent} from "../../../../crop/crop.component";
import {AUTH} from "../../../../../util/Constants";
import {Store} from "../../../../../util/Store";

declare var $: any;
declare var swal: any;

export interface ConfirmModel extends OnInit {
    update: boolean;
}

@Component({
    selector: 'app-create-food-menu-item',
    templateUrl: './create-food-menu-item.component.html',
    styleUrls: ['./create-food-menu-item.component.css']
})
export class CreateFoodMenuItemComponent extends DialogComponent<ConfirmModel, any> implements ConfirmModel {

    private masterMainMenuItemCategory: any;
    private masterSubMenuItemCategories: any;
    private image: any;
    update: boolean;
    private menuItem: any = {
        masterMainItemCategoryId: null,
        fkMasterSubItemCategoryId: null
    };

    constructor(dialogService: DialogService,
                private masterService: MasterService,
                private store: Store,
                private notify: NotificationUtils) {
        super(dialogService);
    }

    ngOnInit(): void {
        this.findActiveMainMenuItemCategories();
    }

    private findActiveMainMenuItemCategories() {
        this.masterService.findActiveMasterMainMenuCategories()
            .subscribe(result => {
                this.masterMainMenuItemCategory = result;
                setTimeout(() => {
                    $(".selectpicker").selectpicker('refresh');
                }, 150);
            })
    }

    findActiveMenuItemCategory() {
        this.masterService.findActiveMasterSubMenuCategories(this.menuItem.masterMainItemCategoryId)
            .subscribe(result => {
                this.masterSubMenuItemCategories = result;
                setTimeout(() => {
                    $(".selectpicker").selectpicker('refresh');
                }, 150);
            })
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
                this.menuItem.fkDocumentId = null;
                this.image = res;
                this.menuItem.image = this.image.image;
            }
        });
    }

    createMenuItem() {
        this.menuItem.createdBy = this.store.getData(AUTH.username);
        this.masterService.saveFoodMenuItem(this.menuItem)
            .subscribe(result => {
                this.cancel();
            });
    }
    cancel() {
        this.result = this.menuItem;
        this.close();
    }

}

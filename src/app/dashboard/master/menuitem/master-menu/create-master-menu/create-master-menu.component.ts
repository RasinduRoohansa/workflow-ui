import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {ConfirmModel} from "../../create-menu-item/create-food-menu-item/create-food-menu-item.component";
import {CropComponent} from "../../../../crop/crop.component";
import {Store} from "../../../../../util/Store";
import {AUTH} from "../../../../../util/Constants";
import {MasterService} from "../../../../../services/master/MasterService";
import {DomSanitizer} from "@angular/platform-browser";

export interface ConfirmModel extends OnInit {
    update: boolean;
}

@Component({
    selector: 'app-create-master-menu',
    templateUrl: './create-master-menu.component.html',
    styleUrls: ['./create-master-menu.component.css']
})
export class CreateMasterMenuComponent extends DialogComponent<ConfirmModel, any> implements ConfirmModel {
    update: boolean;
    private masterMenu: any={
        menuName: null,
        menuCode: null,
        menuDescription: null,
        menuCost:null,
        menuPrice:null,
    }
    private image: any;

    constructor(dialogService: DialogService,
                private masterService: MasterService,
                private _sanitizer: DomSanitizer,
                private store: Store) {
        super(dialogService);
    }

    ngOnInit() {
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
                this.image = res;
                this.masterMenu.image = this.image.image;
            }
        });
    }

    createMasterMenu() {
        this.masterMenu.createdBy = this.store.getData(AUTH.username);
        this.masterService.saveMasterMenu(this.masterMenu)
            .subscribe(result => {
                this.cancel();
            });
    }

    cancel() {
        this.result = this.masterMenu;
        this.close();
    }

}

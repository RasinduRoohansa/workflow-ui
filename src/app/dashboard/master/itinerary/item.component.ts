import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {Store} from "../../../util/Store";
import {AUTH} from "../../../util/Constants";
import {MasterService} from "../../../services/master/MasterService";
import {NotificationUtils} from "../../../util/NotificationUtil";
import {CropComponent} from "../../crop/crop.component";
import {DomSanitizer} from "@angular/platform-browser";

declare var $: any;

export interface ConfirmModel extends OnInit, AfterViewInit {
    categoryId: number;
    updateItem: any;
    update: boolean;
}

@Component({
    selector: 'item-cmp',
    templateUrl: './item.component.html'
})
export class ItemComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    ngAfterViewInit(): void {
        $(".selectpicker").selectpicker();
    }

    updateItem: any;
    update: boolean;
    categoryId: any;

    private item: any;
    private categories: any;

    private image: any;
    private loading = false;

    constructor(private _sanitizer: DomSanitizer,
                dialogService: DialogService,
                private store: Store,
                private masterService: MasterService,
                private notify: NotificationUtils) {
        super(dialogService);
        this.findActiveCategory();
        this.item = {
            itemName: null,
            description: null,
            fkItemCategory: '',
            createdBy: store.getData(AUTH.username)
        };
    }

    ngOnInit(): void {
        if (this.update == true) {
            this.item = this.updateItem;
            setTimeout(() => {
                $(".selectpicker").selectpicker('refresh');
            }, 150);

            if (this.updateItem.fkDocument != null)
                this.masterService.findImage(this.updateItem.fkDocument)
                    .subscribe(res => {
                        this.image = {
                            image: this._sanitizer.bypassSecurityTrustResourceUrl(res.image)
                        };
                    });
        } else {

            setTimeout(val => {
                if (this.categoryId != 0) {
                    this.item.fkItemCategory = this.categoryId;
                }
            }, 100);
            setTimeout(() => {
                $(".selectpicker").selectpicker('refresh');
            }, 150);
        }
    }

    confirm() {
        // we set dialog result as true on click on confirm button,
        // then we can get dialog result from caller code
        this.result = true;
        this.close();
    }

    findActiveCategory() {
        this.masterService.findActiveCategory()
            .subscribe(res => {
                this.categories = res;
                setTimeout(() => {
                    $(".selectpicker").selectpicker('refresh');
                }, 150);
            });
    }

    saveItem() {
        this.loading = true;
        this.masterService.saveItem(this.item)
            .subscribe(res => {
                this.notify.success('Item list has been updated!');
                this.confirm();
                this.loading = false;
            });
    }

    selectImg() {
        this.dialogService.addDialog(CropComponent, {
            title: 'Crop Image',
            message: '',
            cwidth: 26,
            cheight: 20,
            croppedWidth: 259,
            croppedHeight: 200
        }).subscribe((res) => {
            if (res) {
                this.image = res;
                this.item.image = this.image.image;
                this.item.fkDocument = null;
            }
        });
    }
}
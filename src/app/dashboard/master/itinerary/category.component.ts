import {Component} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {Store} from "../../../util/Store";
import {AUTH} from "../../../util/Constants";
import {MasterService} from "../../../services/master/MasterService";
import {NotificationUtils} from "../../../util/NotificationUtil";

export interface ConfirmModel {
    title: string;
    message: string;
}

@Component({
    selector: 'confirm',
    templateUrl: './category.component.html'
})
export class CategoryComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    title: string;
    message: string;

    private category: any;

    constructor(dialogService: DialogService,
                private store: Store,
                private masterService: MasterService,
                private notify: NotificationUtils) {
        super(dialogService);
        this.category = {
            categoryName: null,
            createdBy: store.getData(AUTH.username)
        }
    }

    confirm() {
        // we set dialog result as true on click on confirm button,
        // then we can get dialog result from caller code
        this.result = true;
        this.close();
    }

    saveCategory() {
        this.masterService.saveCategory(this.category)
            .subscribe(res => {
                this.notify.success('Category list has been updated!');
                this.confirm();
            });
    }
}
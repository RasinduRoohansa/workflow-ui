import {Component, OnInit} from '@angular/core';
import {NotificationUtils} from "../../../../../util/NotificationUtil";
import {MasterService} from "../../../../../services/master/MasterService";
import {DialogService} from "ng2-bootstrap-modal";
import {Router} from "@angular/router";
import {CreateFoodMenuItemComponent} from "../../create-menu-item/create-food-menu-item/create-food-menu-item.component";
import {DomSanitizer} from "@angular/platform-browser";

declare var swal: any;

@Component({
    selector: 'app-food-menu-items',
    templateUrl: './food-menu-items.component.html',
    styleUrls: ['./food-menu-items.component.css']
})
export class FoodMenuItemsComponent implements OnInit {
    private masterMenuItems: any;

    constructor(private router: Router,
                private masterService: MasterService,
                private dialogService: DialogService,
                private _sanitizer: DomSanitizer,
                private notify: NotificationUtils) {
    }

    ngOnInit() {
        this.findAllMenuItems();
    }

    createMenuItem() {
        this.dialogService.addDialog(CreateFoodMenuItemComponent, {
            update: false
        }).subscribe((result) => {
            //We get dialog result
            if (result) {
                // this.navigateToSetupPage(result.id);
                swal({
                    type: "success",
                    title: "Success!",
                    text: "New menu item is created successfully!",
                    buttonsStyling: false,
                    confirmButtonText: 'Lets Start!',
                    confirmButtonClass: "btn btn-success"
                });
                this.findAllMenuItems();
            } else {
                // swal({
                //     type: "danger",
                //     title: "Failed!",
                //     text: "New menu item is created failed!",
                //     buttonsStyling: false,
                //     confirmButtonText: 'Try Again!',
                //     confirmButtonClass: "btn btn-danger"
                // });
            }
        });
    }

    private findAllMenuItems() {
        this.masterService.findAllActiveMenuItems()
            .subscribe(result => {
                this.masterMenuItems = result;
            })
    }
    getImage(image) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(image);
    }
}

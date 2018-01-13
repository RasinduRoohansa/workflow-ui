import {Component, Input, OnInit} from '@angular/core';
import {MasterService} from "../../../services/master/MasterService";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-pick-menu-item',
    templateUrl: './pick-menu-item.component.html',
    styleUrls: ['./pick-menu-item.component.css']
})
export class PickMenuItemComponent implements OnInit {
    private masterMenu: any;

    @Input("referenceParent") parentComponent: any;

    private selectedMenu: any;
    private viewMasterMenu: boolean = true;

    private masterMenuItems: any;
    private menuPrice: number = 0;

    constructor(private masterService: MasterService,
                private _sanitizer: DomSanitizer) {
        this.findActiveAllMenus();
    }

    selectMenu(masterMenu) {
        this.selectedMenu = masterMenu;
        this.viewMasterMenu = false;

        this.findMenuItemsByMenuId(this.selectedMenu.id);
    }

    goBackToMenus() {
        this.viewMasterMenu = true;
        this.selectedMenu = null;
        this.masterMenuItems = null;
    }

    findMenuItemsByMenuId(id) {
        this.masterService.findMenuItemsByMenuId(id)
            .subscribe(res => {
                console.log(res);
                this.masterMenuItems = res;

                this.calculatePrice();
            });
    }

    findActiveAllMenus() {
        this.masterService.findActiveAllMenus()
            .subscribe(result => {
                this.masterMenu = result;
            })
    }

    calculatePrice() {
        this.menuPrice = 0;

        this.masterMenuItems.forEach(dao => {
            dao.menuItems.forEach(item => {
                this.menuPrice = this.menuPrice + parseFloat(item.itemPrice);
            })
        })
    }

    getImage(image) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(image);
    }

    ngOnInit() {
    }

}

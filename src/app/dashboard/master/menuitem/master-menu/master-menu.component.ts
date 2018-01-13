import {Component, OnInit} from '@angular/core';
import {CreateMasterMenuComponent} from "./create-master-menu/create-master-menu.component";
import {DialogService} from "ng2-bootstrap-modal";
import {MasterService} from "../../../../services/master/MasterService";
import {DomSanitizer} from "@angular/platform-browser";

declare var $: any;
declare var swal: any;


@Component({
    selector: 'app-master-menu',
    templateUrl: './master-menu.component.html',
    styleUrls: ['./master-menu.component.css']
})
export class MasterMenuComponent  implements OnInit{
    update: boolean;
    private masterMenu: any;

    constructor(private dialogService: DialogService,
                private masterService: MasterService,
                private _sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.findActiveAllMenus();
    }

    private findActiveAllMenus() {
        this.masterService.findActiveAllMenus()
            .subscribe(result=>{
                this.masterMenu = result;
            })
    }
    createNewMenu() {
        this.dialogService.addDialog(CreateMasterMenuComponent, {
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
                this.findActiveAllMenus();
            } else {
            }
        });
    }
    getImage(image) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(image);
    }
}

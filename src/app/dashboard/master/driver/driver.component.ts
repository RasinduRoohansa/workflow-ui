import {Component, OnInit} from "@angular/core";
import {AppConstants} from "../../../configuration/AppConstants";
import {AUTH} from "../../../util/Constants";
import {Store} from "../../../util/Store";
import {MasterService} from "../../../services/master/MasterService";
import {CropComponent} from "../../crop/crop.component";
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {DomSanitizer} from "@angular/platform-browser";

/**
 * @author Rasindu
 * @since 18-12-2017
 */
export interface ConfirmModel extends OnInit {
    update: boolean;
    type: any;
}

declare var swal: any;

@Component({
    selector: 'driver',
    templateUrl: './driver.component.html'
})
export class DriverComponent extends  DialogComponent<ConfirmModel, boolean> implements ConfirmModel {

    type: any;
    update: boolean;

    private DriverComponent={
        image:null,
        createdBy:null,update:false
    };

    private image: any;
    private driver:any;
    private driverList:any;
    private searchText : '';
    private tempDriver:any;

    constructor(private appConstant: AppConstants,
                private store: Store,
                private masterService: MasterService,
                dialogService: DialogService,
                private _sanitizer: DomSanitizer) {
        super(dialogService);
    }
    ngOnInit(): void {
        this.driver = {
            createdBy: this.store.getData(AUTH.username)
        };
        this.findAllDriver();
    }

    saveDriver() {
        this.driver.createdBy=this.store.getData(AUTH.username);
        this.masterService.saveDriver(this.driver)
            .subscribe(res => {
                swal({
                    type: "success",
                    title: "Success!",
                    text: "New supplier is added!",
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success"
                });
                this.ngOnInit();
                this.findAllDriver();
                this.image=null;
            });
    }
    findAllDriver() {
        this.masterService.findAllDriver()
            .subscribe(res => {
                this.driverList = res;
            });
    }

    filterItem() {
        if (this.searchText == '') {
            this.driverList = this.tempDriver;
        } else {
            this.driverList = this.tempDriver.filter(driver => {
                return (driver.driverFullName && driver.driverFullName.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0)
                    || (driver.code && driver.code.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0);
            });
        }
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
                this.driver.image = this.image.image;
            }
        });
    }
    getImage(image) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(image);
    }
}
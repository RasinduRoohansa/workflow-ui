import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {Store} from "../../../util/Store";
import {AUTH} from "../../../util/Constants";
import {MasterService} from "../../../services/master/MasterService";
import {NotificationUtils} from "../../../util/NotificationUtil";
import {CropComponent} from "../../crop/crop.component";
import {DomSanitizer} from "@angular/platform-browser";

export interface ConfirmModel extends OnInit {
    venueName: any;
    fkVenue: any;
    update: boolean;
    spaceVenue: any;
}

@Component({
    selector: 'confirm',
    templateUrl: './space-room.component.html'
})
export class SpaceRoomComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {

    update: boolean;
    venueName: any;
    fkVenue: any;
    spaceVenue: any;

    private space = {
        image: '',
        fkVenue: null,
        createdBy: '',
        fkDocument: null
    };
    private image: any;

    constructor(private _sanitizer: DomSanitizer,
                dialogService: DialogService,
                private store: Store,
                private masterService: MasterService,
                private notify: NotificationUtils) {
        super(dialogService);


    }

    ngOnInit(): void {
        if (this.update == true) {
            this.space = this.spaceVenue;

            if (this.spaceVenue.fkDocument != null) {
                this.masterService.findImage(this.spaceVenue.fkDocument)
                    .subscribe(res => {
                        this.image = {
                            image: this._sanitizer.bypassSecurityTrustResourceUrl(res.image)
                        };
                    });

            }
        }
        this.space.createdBy = this.store.getData(AUTH.username)
    }

    confirm() {
        this.result = true;
        this.close();
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
                this.space.fkDocument = null;
            }
        });
    }

    saveVenueSpace() {
        if (this.update == false) {
            this.space.fkVenue = this.fkVenue;
            if (this.image && this.image.image) {
                this.space.image = this.image.image;
            }
            this.masterService.saveVenueSpace(this.space)
                .subscribe(res => {
                    this.confirm();
                });
        } else {
            if (this.space.fkDocument == null && this.image) {
                this.space.image = this.image.image;
            }
            this.masterService.updateVenueSpace(this.space)
                .subscribe(res => {
                    this.confirm();
                });
        }
    }
}
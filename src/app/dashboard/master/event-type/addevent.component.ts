import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {Store} from "../../../util/Store";
import {AUTH} from "../../../util/Constants";
import {MasterService} from "../../../services/master/MasterService";
import {NotificationUtils} from "../../../util/NotificationUtil";
import {CropComponent} from "../../crop/crop.component";
import {DomSanitizer} from "@angular/platform-browser";

export interface ConfirmModel extends OnInit {
    update: boolean;
    type: any;
}

@Component({
    selector: 'addevent',
    templateUrl: './addevent.component.html'
})
export class AddeventComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {

    type: any;
    update: boolean;

    private eventType = {
        image: null,
        createdBy: null, update: false
    };

    private image: any;
    private loading = false;

    constructor(private _sanitizer: DomSanitizer,
                dialogService: DialogService,
                private store: Store,
                private masterService: MasterService,
                private notify: NotificationUtils) {
        super(dialogService);
    }

    ngOnInit(): void {
        if (this.update == true) {
            this.eventType = this.type;
            this.eventType.update = true;

            this.masterService.findImage(this.type.fkDocument)
                .subscribe(res => {
                    this.image = {
                        image: this._sanitizer.bypassSecurityTrustResourceUrl(res.image)
                    };
                });
        } else {
            this.eventType.update = false;
        }
    }

    confirm() {
        // we set dialog result as true on click on confirm button,
        // then we can get dialog result from caller code
        this.result = true;
        this.close();
    }

    saveEventType() {
        this.loading = true;
        this.eventType.createdBy = this.store.getData(AUTH.username);
        this.masterService.saveEventType(this.eventType)
            .subscribe(res => {
                this.notify.success("Event master has been updated!");
                this.loading = false;
                this.result = true;
                this.close();
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
                this.eventType.image = this.image.image;
            }
        });
    }
}
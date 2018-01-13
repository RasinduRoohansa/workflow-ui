import {Component} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {Store} from "../../../util/Store";
import {MasterService} from "../../../services/master/MasterService";
import {NotificationUtils} from "../../../util/NotificationUtil";
import {DomSanitizer} from "@angular/platform-browser";
import {AUTH} from "../../../util/Constants";

export interface ConfirmModel {
    fkVenueSpace: any;
    spaceName: string;
    venueName: string;
}

@Component({
    selector: 'confirm-img',
    templateUrl: './vsimg.component.html'
})
export class VsimgComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    venueName: string;
    spaceName: string;
    fkVenueSpace: any;

    imageSelected: boolean;

    private images = [];
    private uploading = false;
    private reading = false;

    constructor(private _sanitizer: DomSanitizer,
                dialogService: DialogService,
                private store: Store,
                private masterService: MasterService,
                private notify: NotificationUtils) {
        super(dialogService);
    }

    confirm() {
        this.result = true;
        this.close();
    }

    fileChangeListener($event) {
        this.reading = true;
        this.imageSelected = true;
        var read = $event.target.files;

        var files = [];
        for (var i = 0; i < read.length; i++) {
            if (i + this.images.length >= 10) {
                this.notify.warn('You can choose to upload more than one file and less than ten files at a time !');
                break;
            } else {
                files.push(read[i]);
            }
        }

        var reader = [];
        for (var i = 0; i < files.length; i++) {
            reader.push(new FileReader());
        }

        for (var i = 0; i < files.length; i++) {
            reader[i].addEventListener("load", e => {
                this.images.push({
                    status: 0,
                    fkId: this.fkVenueSpace,
                    image: e.target.result
                })
            }, false);
            reader[i].readAsDataURL(files[i]);
        }
        this.reading = false;
    }

    upload() {
        this.uploading = true;
        var img = this.images.pop();
        img.status = 1;
        img.createdBy = this.store.getData(AUTH.username);
        this.uploadImage(img);
    }

    uploadImage(img) {
        this.masterService.saveImageForVenueSpace(img)
            .subscribe(res => {
                img.status = 2;
                if (this.images.length > 0) {
                    this.upload();
                } else {
                    this.images = [];
                    this.uploading = false;
                    this.notify.success("Upload completed!");
                }
            });
    }

    // cropImage(img) {
    //     this.dialogService.addDialog(CropsingleComponent, {
    //         img: img.image
    //     }).subscribe((res) => {
    //         if (res) {
    //             img.image = res;
    //         }
    //     });
    // }

    getBackground(image) {
        return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
    }

    clearAll() {
        this.images = [];
    }
}
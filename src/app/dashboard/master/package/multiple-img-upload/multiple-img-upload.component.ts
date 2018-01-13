import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {DomSanitizer} from "@angular/platform-browser";
import {Store} from "../../../../util/Store";
import {NotificationUtils} from "../../../../util/NotificationUtil";
import {AUTH} from "../../../../util/Constants";
import {MasterService} from "../../../../services/master/MasterService";

export interface ConfirmModel {
    packageName: any;
    packageId: number;
}

@Component({
    selector: 'app-multiple-img-upload',
    templateUrl: './multiple-img-upload.component.html',
    styleUrls: ['./multiple-img-upload.component.css']
})
export class MultipleImgUploadComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    packageId: number;
    packageName: any;

    imageSelected: boolean;

    private images = [];
    private uploading = false;
    private reading = false;

    constructor(private _sanitizer: DomSanitizer,
                private store: Store,
                private notify: NotificationUtils,
                private masterService: MasterService,
                dialogService: DialogService) {
        super(dialogService);
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
                    fkId: this.packageId,
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
        this.masterService.saveImageForPackages(img)
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

    getBackground(image) {
        return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
    }
}

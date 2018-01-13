import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {CropperSettings, ImageCropperComponent} from "ng2-img-cropper";
import {NotificationUtils} from "../../util/NotificationUtil";

export interface ConfirmModel extends AfterViewInit {
    title: string;
    message: string;
    cwidth: number;
    cheight: number;
    croppedWidth: number;
    croppedHeight: number;
}

@Component({
    selector: 'crop-img',
    templateUrl: './crop.component.html'
})
export class CropComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {

    title: string;
    message: string;
    cwidth: number;
    cheight: number;
    croppedWidth: number;
    croppedHeight: number;

    data: any;
    cropperSettings: CropperSettings;

    @ViewChild('cropper', undefined)
    cropper: ImageCropperComponent;

    imageSelected: boolean;

    constructor(dialogService: DialogService,
                private notify: NotificationUtils) {
        super(dialogService);

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;
        this.data = {};
        this.imageSelected = false;
        this.cropperSettings.dynamicSizing = true;
        this.cropperSettings.cropperClass = "myCropper";
    }

    ngAfterViewInit(): void {
        this.cropperSettings.width = this.cwidth;
        this.cropperSettings.height = this.cheight;
        this.cropperSettings.croppedWidth = this.croppedWidth;
        this.cropperSettings.croppedHeight = this.croppedHeight;
    }

    fileChangeListener($event) {
        this.imageSelected = true;
        var image: any = new Image();
        var file: File = $event.target.files[0];
        var myReader: FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);

        };

        myReader.readAsDataURL(file);
    }

    crop() {
        if (this.data.image) {
            this.result = this.data;
            this.close();
        } else {
            this.notify.warn("Image is not found !");
        }
    }
}
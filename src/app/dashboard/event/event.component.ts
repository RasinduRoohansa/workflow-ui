import {Component} from "@angular/core";
import {CropperSettings} from "ng2-img-cropper";
import {DialogService} from "ng2-bootstrap-modal";
import {CropComponent} from "../crop/crop.component";

@Component({
    selector: 'event-cmp',
    templateUrl: './event.component.html'
})
export class EventComponent {
    constructor(private dialogService:DialogService) {

    }

    addImage(){
        this.dialogService.addDialog(CropComponent, {
            title: 'Crop Image',
            message: ''
        }).subscribe((isConfirmed) => {
            //We get dialog result
            if (isConfirmed) {

            } else {

            }
        });
    }
}
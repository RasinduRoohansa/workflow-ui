import {Component, OnInit} from "@angular/core";
import {MasterService} from "../../../services/master/MasterService";
import {NotificationUtils} from "../../../util/NotificationUtil";
import {Store} from "../../../util/Store";
import {AUTH} from "../../../util/Constants";
import {DialogService} from "ng2-bootstrap-modal";
import {AddeventComponent} from "./addevent.component";
import {DomSanitizer} from "@angular/platform-browser";

declare var swal: any;

@Component({
    selector: 'eventType',
    templateUrl: './eventType.component.html'
})
export class EventTypeComponent extends OnInit {

    private eventType = {};
    private eventTypes = [];
    private eventTypesTemp = [];
    private searchText: string;

    constructor(private _sanitizer: DomSanitizer,
                private dialogService: DialogService,
                private masterService: MasterService,
                private notify: NotificationUtils,
                private store: Store) {
        super();
    }

    ngOnInit(): void {
        this.eventType = {
            createdBy: this.store.getData(AUTH.username)
        };

        this.findAllEventTypes();
    }

    saveEventType() {
        this.masterService.saveEventType(this.eventType)
            .subscribe(res => {
                this.notify.success("Event master has been updated, awesome!");
            });
    }

    findAllEventTypes() {
        this.masterService.findAllEventTypes()
            .subscribe(res => {
                this.eventTypes = res;
                this.eventTypesTemp = res;
            });
    }

    activeDeactivate(event) {
        if (event.activated == true) {
            event.activated = false;
        } else {
            event.activated = true;
        }
        this.masterService.updateEventType(event)
            .subscribe(res => {
                if (event.activated) {
                    swal({
                        type: "success",
                        title: "Activated!",
                        text: "Event type has been activated!",
                        buttonsStyling: false,
                        confirmButtonClass: "btn btn-success"

                    });
                } else {
                    this.notify.warn("Event type has been deactivated!");
                }
            });
    }

    addEventType() {
        this.dialogService.addDialog(AddeventComponent, {
            update: false
        }).subscribe((isConfirmed) => {
            //We get dialog result
            if (isConfirmed) {
                this.findAllEventTypes();
            }
        });
    }

    updateEventType(eventType) {
        this.dialogService.addDialog(AddeventComponent, {
            update: true,
            type: eventType
        }).subscribe((isConfirmed) => {
            //We get dialog result
            if (isConfirmed) {
                this.findAllEventTypes();
            }
        });
    }

    refresh() {
        this.findAllEventTypes();
    }

    filter() {
        if (this.searchText == '') {
            this.eventTypes = this.eventTypesTemp;
        } else {
            this.eventTypes = this.eventTypesTemp.filter(item => {
                return (item.eventType && item.eventType.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0)
                    || (item.code && item.code.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0)
                    || (item.description && item.description.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0);
            });
        }
    }

    getImage(image) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(image);
    }
}
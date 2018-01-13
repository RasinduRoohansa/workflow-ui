import {Component, OnInit} from "@angular/core";
import {MasterService} from "../../../services/master/MasterService";
import {NotificationUtils} from "../../../util/NotificationUtil";
import {Store} from "../../../util/Store";
import {AUTH} from "../../../util/Constants";
import {Router} from "@angular/router";
import {SpaceRoomComponent} from "./space-room.component";
import {DialogService} from "ng2-bootstrap-modal";
import {VsimgComponent} from "./vsimg.component";
import {ViewmoreComponent} from "./viewmore.component";
import {DomSanitizer} from "@angular/platform-browser";

declare var swal: any;

@Component({
    selector: 'venue',
    templateUrl: './venue.component.html'
})
export class VenueComponent extends OnInit {
    private venue = {};
    private venueList = [];
    private venueListTemp = [];
    private searchText = '';

    constructor(private _sanitizer: DomSanitizer,
                private masterService: MasterService,
                private notify: NotificationUtils,
                private store: Store,
                private route: Router,
                private dialogService: DialogService) {
        super();
    }

    ngOnInit(): void {
        this.findAllVenue();
        this.venue = {
            createdBy: this.store.getData(AUTH.username)
        };
    }

    findAllVenue() {
        this.masterService.findAllVenue()
            .subscribe(res => {
                this.venueList = res;
                this.venueListTemp = res;
            });
    }

    saveVenue() {
        this.masterService.saveVenue(this.venue)
            .subscribe(res => {
                swal({
                    type: "success",
                    title: "Good job!",
                    text: "New venue is created successfully!",
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success"
                });
                this.ngOnInit();
            });
    }

    addSpaceRoom(venue) {
        this.dialogService.addDialog(SpaceRoomComponent, {
            fkVenue: venue.id,
            venueName: venue.venueName,
            update: false
        }).subscribe((isConfirmed) => {
            //We get dialog result
            if (isConfirmed) {
                this.masterService.findVenueSpace(venue.id)
                    .subscribe(res => {
                        venue.spaces = res;
                    });
                this.notify.success('Venue space/room list has been updated!');
            } else {

            }
        });
    }

    updateSpaceRoom(venue, space) {
        this.dialogService.addDialog(SpaceRoomComponent, {
            fkVenue: venue.id,
            venueName: venue.venueName,
            update: true,
            spaceVenue: space
        }).subscribe((isConfirmed) => {
            //We get dialog result
            if (isConfirmed) {
                this.masterService.findVenueSpace(venue.id)
                    .subscribe(res => {
                        venue.spaces = res;
                    });
                this.notify.success('Venue space/room list has been updated!');
            } else {

            }
        });
    }

    filterItem() {
        if (this.searchText == '') {
            this.venueList = this.venueListTemp;
        } else {
            this.venueList = this.venueListTemp.filter(venue => {
                return (venue.venueName && venue.venueName.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0);
            });
        }
    }

    getDescriptionShort(desc) {
        if (desc != null) {
            if (desc.length >= 45) {
                return desc.substring(0, 45).concat('...');
            }
            return desc.substring(0, desc.length);
        }
        return '';
    }

    viewImages(space, venue) {
        this.dialogService.addDialog(VsimgComponent, {
            fkVenueSpace: space.id,
            spaceName: space.name,
            venueName: venue.venueName
        }).subscribe((isConfirmed) => {
            //We get dialog result
            if (isConfirmed) {

            } else {

            }
        });
    }

    viewMore(space, venue) {
        this.route.navigate(['master/view-more'], {
            queryParams: {
                id: btoa(space.id)
            }
        });
    }

    activateVenueSpace(space) {
        this.masterService.activateVenueSpace(space.id)
            .subscribe(res => {
                if (res) {
                    swal({
                        type: "success",
                        title: "Activated!",
                        text: "Venue space has been activated!",
                        buttonsStyling: false,
                        confirmButtonClass: "btn btn-success"
                    });
                    space.activated = 1;
                }
            });
    }

    deactivateVenueSpace(space) {
        this.masterService.deactivateVenueSpace(space.id)
            .subscribe(res => {
                if (res) {
                    this.notify.warn("Venue space has been deactivated!");
                    space.activated = 0;
                }
            });
    }

    getImage(image) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(image);
    }
}
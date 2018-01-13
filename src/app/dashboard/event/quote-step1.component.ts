import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from "@angular/core";
import {CalendarService} from "../../services/calendar/CalendarService";
import {Store} from "../../util/Store";
import {AUTH} from "../../util/Constants";
import {ActivatedRoute, Router} from "@angular/router";
import {EnquiryService} from "../../services/enquiry/EnquiryService";
import {FormControl} from "@angular/forms";
import {MapsAPILoader} from "@agm/core";
import {} from 'googlemaps';
import {NotificationUtils} from "../../util/NotificationUtil";

declare var swal: any;
declare var $: any;

@Component({
    selector: 'quote-cmp',
    templateUrl: './quote-step1.component.html'
})
export class QuoteStep1Component extends OnInit implements AfterViewInit {
    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;

    @ViewChild("search")
    public searchElementRef: ElementRef;


    private viewMode: boolean = false;

    private enquiryId: any;

    public startDate: any;
    public endDate: any;
    private userCalendarContainer: any;
    private userCalendar: any;
    private walkthrough = {
        fkEnquiry: null,
        transport: true,
        pickupTime: null,
        message: null,
        createdBy: this.store.getData(AUTH.username),
        location: {
            lat: 0,
            lng: 0,
            address: '',
            url: '',
            placeId: ''
        },
        calendar: {
            title: '',
            category: 'Walk Through Setup',
            startDate: null,
            endDate: null,
            className: 'event-azure',
            username: this.store.getData(AUTH.username)
        }
    };

    private enquiryDetail: any;

    public options = {types: ['address']};

    constructor(private mapsAPILoader: MapsAPILoader,
                private route: Router,
                private ngZone: NgZone,
                private calendarService: CalendarService,
                private store: Store,
                private notify: NotificationUtils,
                private activatedRoute: ActivatedRoute,
                private enquiryService: EnquiryService) {
        super();
        this.enquiryId = this.activatedRoute.snapshot.params['id'];
        this.walkthrough.fkEnquiry = this.enquiryId;

        this.enquiryService.findEnquiryById(this.enquiryId)
            .subscribe(res => {
                this.enquiryDetail = res;
                this.walkthrough.calendar.title = res.customer.firstName + ' ' + res.customer.lastName;
            });
    }

    ngOnInit(): void {
        this.loadMap();
        this.userCalendarContainer = $('#fullCalendar');
        this.findCalendarByUsername(this.store.getData(AUTH.username));

        var that = this;
        this.userCalendar = this.calendarService.findOptionCalendar(
            function (start, end) {
                that.setDate(start, end);
            }
        );
    }

    loadMap() {

        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;
        this.searchControl = new FormControl();
        this.setCurrentPosition();
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();

                    this.walkthrough.location.url = place.url;
                    this.walkthrough.location.address = place.formatted_address;
                    this.walkthrough.location.placeId = place.id;
                    this.walkthrough.location.lat = this.latitude;
                    this.walkthrough.location.lng = this.longitude;

                    this.zoom = 12;
                });
            });
        });

        // setTimeout(function () {
        //     $('#location-map').css('display', 'none');
        // }, 1000);
    }

    setCurrentPosition() {
        this.enquiryService.findReserveTimeWalkThrough(this.enquiryId)
            .subscribe(res => {
                if (res.id) {
                    this.walkthrough = res;

                    this.viewMode = true;
                    this.latitude = this.walkthrough.location.lat;
                    this.longitude = this.walkthrough.location.lng;

                    this.startDate = this.walkthrough.calendar.startDate;
                    this.endDate = this.walkthrough.calendar.endDate;
                    this.zoom = 12;
                } else {
                    if ("geolocation" in navigator) {
                        navigator.geolocation.getCurrentPosition((position) => {
                            this.latitude = position.coords.latitude;
                            this.longitude = position.coords.longitude;
                            this.zoom = 12;
                        });
                    }
                }
            });
    }

    ngAfterViewInit(): void {
        $('.timepicker').datetimepicker({
            format: 'h:mm A',
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove',
                inline: true

            }
        });
        // $('#time-row').css('display', 'none');
        // $('#location-row').css('display', 'none');
    }

    refreshTimePicker() {
        if (this.walkthrough.transport) {
            $('#time-row').css('display', 'block');
            $('#location-row').css('display', 'block');
            $('#location-map').css('display', 'block');
        } else {
            $('#time-row').css('display', 'none');
            $('#location-row').css('display', 'none');
            $('#location-map').css('display', 'none');
        }
    }

    findCalendarByUsername(username) {
        this.calendarService.findCalendarByUsername(username)
            .subscribe(res => {
                this.userCalendar.events = this.calendarService.convertToCalendarEvent(res);
                this.userCalendarContainer.fullCalendar(this.userCalendar);
            });
    }

    resetCurrentEvent() {
        this.userCalendarContainer.fullCalendar('removeEvents', -1);

        var event = {
            id: -1,
            title: this.walkthrough.calendar.category + ' - ' + this.walkthrough.calendar.title,
            start: this.startDate,
            end: this.endDate
        };
        this.userCalendarContainer.fullCalendar('renderEvent', event, false); // stick? = true
    }

    setDate(start, end) {
        this.startDate = this.calendarService.dateFormat(new Date(start));

        var endDate = new Date(end);
        endDate.setUTCMinutes(endDate.getUTCMinutes() - 1);
        this.endDate = this.calendarService.dateFormat(endDate);

        this.resetCurrentEvent();
    }

    saveReservation() {
        var valid = true;

        if (!this.startDate || !this.endDate) {
            this.notify.warn('Mark available time in calendar to reserve walk through time');
            valid = false;
        }

        if (this.walkthrough.transport && this.walkthrough.location.address.trim() == '') {
            this.notify.warn('Pick a location');
            valid = false;
        }

        if (valid) {
            this.walkthrough.calendar.startDate = this.startDate;
            this.walkthrough.calendar.endDate = this.endDate;
            this.walkthrough.pickupTime = $('#time-pick').val();

            this.enquiryService.reserveTimeWalkThrough(this.walkthrough)
                .subscribe(res => {
                    this.route.navigate(['enquiry']);

                    swal({
                        type: "success",
                        title: "Success!",
                        text: "Walk Through Setup Calendar Event Created!",
                        buttonsStyling: false,
                        confirmButtonClass: "btn btn-success"
                    });
                }, error => {
                    this.notify.error('Something went wrong!');
                });
        }
    }

    changePickup() {
        this.viewMode = false;

        this.startDate = null;
        this.endDate = null;
        this.walkthrough = {
            fkEnquiry: null,
            transport: true,
            pickupTime: null,
            message: null,
            createdBy: this.store.getData(AUTH.username),
            location: {
                lat: 0,
                lng: 0,
                address: '',
                url: '',
                placeId: ''
            },
            calendar: {
                title: '',
                category: 'Walk Through Setup',
                startDate: null,
                endDate: null,
                className: 'event-azure',
                username: this.store.getData(AUTH.username)
            }
        };
        this.walkthrough.fkEnquiry = this.enquiryId;

        setTimeout(function () {
            $('.timepicker').datetimepicker({
                format: 'h:mm A',
                icons: {
                    time: "fa fa-clock-o",
                    date: "fa fa-calendar",
                    up: "fa fa-chevron-up",
                    down: "fa fa-chevron-down",
                    previous: 'fa fa-chevron-left',
                    next: 'fa fa-chevron-right',
                    today: 'fa fa-screenshot',
                    clear: 'fa fa-trash',
                    close: 'fa fa-remove',
                    inline: true

                }
            });
        }, 200);
    }
}
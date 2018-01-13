import {Injectable} from "@angular/core";
import {HttpService} from "../../configuration/HttpService";
import {AppConstants} from "../../configuration/AppConstants";
import {DialogService} from "ng2-bootstrap-modal";
import {CalendarPopupComponent} from "../../dashboard/common/calendar-popup.component";

declare var swal: any;
declare var $: any;

@Injectable()
export class CalendarService {
    constructor(private httpService: HttpService,
                private appConstant: AppConstants,
                private dialogService: DialogService) {

    }

    findCalendarByUsername(username: any) {
        let url = this.appConstant.baseURL + this.appConstant.findCalendarByUsername;
        return this.httpService.httpGet(url.replace('${username}', username));
    }

    convertToCalendarEvent(events) {
        var calendarEvents = [];

        events.forEach(value => {
            if (value.url == null) {
                var sDate = this.toLocalDate(value.startDate);
                var eDate = this.toLocalDate(value.endDate);

                calendarEvents.push({
                    title: value.category + ' - ' + value.title,
                    start: sDate,
                    end: eDate,
                    allDay: value.allDay,
                    className: value.className
                });
            }
        });

        return calendarEvents;
    }

    toLocalDate(date) {
        var value = new Date(date);
        return value;
    };

    dateFormat(sDate) {
        var sy = sDate.getUTCFullYear();
        var sMn = sDate.getUTCMonth();
        var sd = sDate.getUTCDate();
        var sh = sDate.getUTCHours();
        var sm = sDate.getUTCMinutes();
        return new Date(sy, sMn, sd, sh, sm);
    };

    findOptionCalendar(selectEvent, category?: string) {
        var that = this;
        return {
            viewRender: function (view, element) {
                if (view.name != 'month') {
                    var $fc_scroller = $('.fc-scroller');
                    $fc_scroller.perfectScrollbar();
                }
            },
            header: {
                left: 'month,agendaWeek,agendaDay,listWeek',
                center: 'title',
                right: 'prev,next,today'
            },
            defaultDate: new Date(),
            selectable: true,
            selectHelper: true,
            views: {
                month: {
                    titleFormat: 'MMMM YYYY'
                },
                week: {
                    titleFormat: " MMMM D YYYY"
                },
                day: {
                    titleFormat: 'D MMMM YYYY'
                }
            },
            select: selectEvent,
            editable: false,
            eventLimit: true,
            events: null,
            eventClick: function (calEvent, jsEvent, view) {
                that.dialogService
                    .addDialog(CalendarPopupComponent, {
                        name: calEvent.title,
                        start: calEvent.start,
                        end: calEvent.end
                    })
                    .subscribe((isConfirmed) => {

                    });
            }
        };
    }

}
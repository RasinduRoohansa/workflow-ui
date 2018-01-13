import {AfterViewInit, Component} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";

declare var swal: any;
declare var $: any;

export interface ConfirmModel extends AfterViewInit {

}

@Component({
    selector: 'app-add-booking-checklist-item',
    templateUrl: './add-booking-checklist-item.component.html',
    styleUrls: ['./add-booking-checklist-item.component.css']
})
export class AddBookingChecklistItemComponent extends DialogComponent<ConfirmModel, any> implements ConfirmModel {

    private checkItem: any = {
        itemName: null,
        sheduleType: null,
        sheduleTime: null,
        sheduleMinute: null,
        sheduled: false
    };

    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    ngAfterViewInit(): void {
        $(".selectpicker").selectpicker('refresh');
    }

    changeEventType() {
        setTimeout(() => {
            $(".selectpicker").selectpicker('refresh');
        }, 150);

        setTimeout(() => {
            $('.datetimepicker').datetimepicker({
                icons: {
                    time: "fa fa-clock-o",
                    date: "fa fa-calendar",
                    up: "fa fa-chevron-up",
                    down: "fa fa-chevron-down",
                    previous: 'fa fa-chevron-left',
                    next: 'fa fa-chevron-right',
                    today: 'fa fa-screenshot',
                    clear: 'fa fa-trash',
                    close: 'fa fa-remove'
                }
            });
        }, 150);
    }

    save() {
        if (this.checkItem.sheduleType != null) {
            this.checkItem.sheduled = true;
            this.checkItem.sheduleTime = $('#scheduleTime').val();
        }

        this.result = this.checkItem;
        this.close();
    }

}

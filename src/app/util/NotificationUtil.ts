import {Injectable} from "@angular/core";

declare var $: any;

@Injectable()
export class NotificationUtils {
    private from: string;
    private align: string;

    constructor() {
        this.from = 'bottom';
        this.align = 'right';
    }

    success(msg) {
        $.notify({
            icon: "notifications",
            message: msg

        }, {
            type: 'success',
            timer: 1000,
            placement: {
                from: this.from,
                align: this.align
            }
        });
    }

    warn(msg) {
        $.notify({
            icon: "notifications",
            message: msg

        }, {
            type: 'warning',
            timer: 1000,
            placement: {
                from: this.from,
                align: this.align
            }
        });
    }

    error(msg) {
        $.notify({
            icon: "notifications",
            message: msg

        }, {
            type: 'danger',
            timer: 1000,
            placement: {
                from: this.from,
                align: this.align
            }
        });
    }

    info(msg) {
        $.notify({
            icon: "notifications",
            message: msg

        }, {
            type: 'info',
            timer: 1000,
            placement: {
                from: this.from,
                align: this.align
            }
        });
    }
}
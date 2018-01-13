import {Component, OnInit, ElementRef} from '@angular/core';

import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {Router} from "@angular/router";
import {AppConstants} from "./configuration/AppConstants";
import {AuthService} from "./configuration/AuthService";
import {AUTH, SYSTEM} from "./util/Constants";
import {Store} from "./util/Store";

declare var swal: any;
declare var $: any;

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
    idleState = 'Not started.';
    timedOut = false;
    lastPing?: Date = null;

    constructor(private elRef: ElementRef,
                private idle: Idle,
                private keepalive: Keepalive,
                private route: Router,
                private store: Store) {
        idle.setIdle(300);
        idle.setTimeout(30);
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
        idle.onTimeout.subscribe(() => {
            if (this.timedOut == false) {
                this.idleState = 'Timed out!';
                this.timedOut = true;

                //lock system
                this.store.removeData(AUTH.token);
                this.store.setData(SYSTEM.curLocation, this.route.url);
                window.location.reload();
            }
        });
        idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');


        idle.onTimeoutWarning.subscribe((countdown) => {
                if (this.timedOut == false) {
                    swal({
                        title: "TIME OUT!",
                        text: "I will close in " + countdown + " seconds.",
                        timer: countdown * 1000,
                        showConfirmButton: false
                    })
                }
            }
        );

        // sets the ping interval to 15 seconds
        keepalive.interval(15);

        keepalive.onPing.subscribe(() => this.lastPing = new Date());

        this.reset();
    }

    reset() {
        this.idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
    }

    timeout() {
        this.timedOut = true;
    }

    ngOnInit() {
        let body = document.getElementsByTagName('body')[0];
        var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
        if (isWindows) {
            // if we are on windows OS we activate the perfectScrollbar function
            body.classList.add("perfect-scrollbar-on");
        } else {
            body.classList.add("perfect-scrollbar-off");
        }
        $.material.init();
    }
}

import {Component, OnInit, Renderer, ViewChild, ElementRef, Directive} from '@angular/core';
import {ROUTES} from '../.././sidebar/sidebar-routes.config';
import {Router, ActivatedRoute} from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {AuthService} from "../../configuration/AuthService";
import {Store} from "../../util/Store";
import {AUTH, SYSTEM} from "../../util/Constants";
import {AppConstants} from "../../configuration/AppConstants";
import {SharedService} from "../../util/SharedService";

var misc: any = {
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
}
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;
    private admin: boolean;

    @ViewChild("navbar-cmp") button;

    constructor(location: Location,
                private renderer: Renderer,
                private element: ElementRef,
                private authService: AuthService,
                private route: Router,
                private store: Store,
                private appConstant: AppConstants) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;

        if (this.store.getData(AUTH.admin).toString() == 'null') {
            this.authService.findUser(this.store.getData(AUTH.username))
                .subscribe(res => {
                    this.store.setData(AUTH.admin, res.admin);
                    this.admin = this.store.getData(AUTH.admin).toString() == 'true';
                });
        } else {
            this.admin = this.store.getData(AUTH.admin).toString() == 'true';
        }
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);

        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        if ($('body').hasClass('sidebar-mini')) {
            misc.sidebar_mini_active = true;
        }
        var logoimg = document.getElementById('logoimg');
        var logoimg2 = document.getElementById('logoimg2');
        $('#minimizeSidebar').click(function () {
            var $btn = $(this);

            if (misc.sidebar_mini_active == true) {
                $('body').removeClass('sidebar-mini');
                misc.sidebar_mini_active = false;
                logoimg.style.display = "block";
                logoimg2.style.display = "none";

            } else {
                setTimeout(function () {
                    $('body').addClass('sidebar-mini');

                    misc.sidebar_mini_active = true;
                    logoimg2.style.display = "block";
                    logoimg.style.display = "none";
                }, 300);
            }

            // we simulate the window Resize so the charts will get updated in realtime.
            var simulateWindowResize = setInterval(function () {
                window.dispatchEvent(new Event('resize'));
            }, 180);

            // we stop the simulation of Window Resize after the animations are completed
            setTimeout(function () {
                clearInterval(simulateWindowResize);
            }, 1000);
        });

        setTimeout(function () {
            $('body').addClass('sidebar-mini');

            misc.sidebar_mini_active = true;
            logoimg2.style.display = "block";
            logoimg.style.display = "none";
        }, 300);
        // we simulate the window Resize so the charts will get updated in realtime.
        var simulateWindowResize = setInterval(function () {
            window.dispatchEvent(new Event('resize'));
        }, 180);

        // we stop the simulation of Window Resize after the animations are completed
        setTimeout(function () {
            clearInterval(simulateWindowResize);
        }, 1000);
    }

    isMobileMenu() {
        if ($(window).width() < 991) {
            return false;
        }
        return true;
    }

    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var logoimg = document.getElementById('logoimg');

        if (this.sidebarVisible == false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;

            console.log(logoimg);
            logoimg.style.backgroundImage = "url('/assets/img/logo.jpg')";
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');

            logoimg.style.backgroundImage = "url('/assets/img/angular2-logo-white.png')";
        }
    }

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(2);
        }
        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

    getPath() {
        // console.log(this.location);
        return this.location.prepareExternalUrl(this.location.path());
    }

    logout() {
        this.authService.doLogout();
        window.location.reload();
    }

    lockMe() {
        this.store.removeData(AUTH.token);
        this.store.setData(SYSTEM.curLocation, this.route.url);
        window.location.reload();
    }

    navigateToDashboard() {
        window.location.href = '';
    }

    navigateToAdmin() {
        this.route.navigate(['admin/home']);
    }
}

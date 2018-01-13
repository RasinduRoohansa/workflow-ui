import {Component, OnInit, AfterViewInit} from '@angular/core';

import * as Chartist from 'chartist';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {DashboardService} from "../services/dashboard/DashboardService";

declare var $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {
    title: string = '';
    private marker: any;
    private customer: any;

    private lat: number;
    private lng: number;

    private dashboard: any;

    startAnimationForLineChart(chart) {
        var seq, delays, durations;
        seq = 0;
        delays = 80;
        durations = 500;
        chart.on('draw', function (data) {

            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq = 0;
    }

    ngOnInit(): void {

        var grandOnPrinces = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [12, 74, 7, 52, 23, 18, 38]
            ]
        };
        var grandOnCathies = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [87, 17, 14, 17, 23, 18, 85]
            ]
        };
        var grandOnMetropol = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [85, 17, 78, 17, 45, 18, 41]
            ]
        };

        var optionsDailySalesChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {top: 0, right: 0, bottom: 0, left: 0},
        }

        var grandOnPricesChart = new Chartist.Line('#grandOnPricesChart', grandOnPrinces, optionsDailySalesChart);
        var grandOnCathiesChart = new Chartist.Line('#grandOnCathiesChart', grandOnCathies, optionsDailySalesChart);
        var grandOnMetropolChart = new Chartist.Line('#grandOnMetropolChart', grandOnMetropol, optionsDailySalesChart);

        this.startAnimationForLineChart(grandOnPricesChart);
        this.startAnimationForLineChart(grandOnCathiesChart);
        this.startAnimationForLineChart(grandOnMetropolChart);
    }

    constructor(private dashboardService: DashboardService) {
        this.marker = [{
            lat: -37.928874,
            lng: 145.151610
        }, {
            lat: -37.870401,
            lng: 145.213346
        }, {
            lat: -38.145177,
            lng: 145.120433
        }];

        this.dashboardService.findDashboardSummery()
            .subscribe(res => {
                this.dashboard = res;
                this.customer = this.dashboardService.findMaker(this.dashboard.mapLocation);
            });

        this.lat = -37.928874;
        this.lng = 145.151610;
    }

    ngAfterViewInit() {
        var breakCards = true;
        if (breakCards == true) {
            // We break the cards headers if there is too much stress on them :-)
            $('[data-header-animation="true"]').each(function () {
                var $fix_button = $(this);
                var $card = $(this).parent('.card');
                $card.find('.fix-broken-card').click(function () {
                    console.log(this);
                    var $header = $(this).parent().parent().siblings('.card-header, .card-image');
                    $header.removeClass('hinge').addClass('fadeInDown');

                    $card.attr('data-count', 0);

                    setTimeout(function () {
                        $header.removeClass('fadeInDown animate');
                    }, 480);
                });

                $card.mouseenter(function () {
                    var $this = $(this);
                    var hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
                    $this.attr("data-count", hover_count);
                    if (hover_count >= 20) {
                        $(this).children('.card-header, .card-image').addClass('hinge animated');
                    }
                });
            });
        }
        //  Activate the tooltips
        $('[rel="tooltip"]').tooltip();
    }

    substringAddress(address) {
        if (address.length <= 20) {
            return address.substring(0, address.length);
        }
        return address.substring(0, 20) + '...';
    }
    getDescriptionLine(place) {
        var v = '';
        if(place.enquiry && place.enquiry.customer){
            v+= place.enquiry.customer.firstName.toUpperCase();
        }
        return v;
    }
}

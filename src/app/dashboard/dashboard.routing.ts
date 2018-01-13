import {Routes} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {AuthGuard} from "../configuration/AuthGuard";
import {MasterComponent} from "./master/master.component";
import {VenueComponent} from "./master/venue/venue.component";
import {EventTypeComponent} from "./master/event-type/eventType.component";
import {EventComponent} from "./event/event.component";
import {SupplierComponent} from "./master/supplier/supplier.component";
import {ItineraryComponent} from "./master/itinerary/itinerary.component";
import {EnquiryComponent} from "./enquiry/enquiry.component";
import {ViewmoreComponent} from "./master/venue/viewmore.component";
import {QuoteStep1Component} from "./event/quote-step1.component";
import {QuestionComponent} from "./master/walkthrough/question.component";
import {WalkTemplateComponent} from "./master/walkthrough/walk-template.component";
import {PackageComponent} from "./master/package/package.component";
import {SetupPackageComponent} from "./master/package/setup-package.component";
import {WalkthroughComponent} from "./enquiry/walkthrough.component";
import {DriverComponent} from "./master/driver/driver.component";
import {DriverAllocation} from "./enquiry/transportAllocation.component";
import {TransportVoucherComponent} from "./voucher/transport/transport.voucher.component";
import {RosterComponent} from './roster/roster/roster.component';
import {EventallocationComponent} from './roster/eventallocation/eventallocation.component';
import {BookNowComponent} from "./booking/book-now/book-now.component";
import {FoodMenuItemsComponent} from "./master/menuitem/menu-items/food-menu-items/food-menu-items.component";
import {MasterMenuComponent} from "./master/menuitem/master-menu/master-menu.component";
import {BookingComponent} from "./booking/booking/booking.component";
import {EventLoggerComponent} from "./logger/event-logger/event-logger.component";
import {BookingDashboardComponent} from "./booking/booking-dashboard/booking-dashboard.component";
import {CheckListComponent} from "./booking/booking-dashboard/check-list/check-list.component";
import {TablePlanComponent} from "./booking/booking-dashboard/table-plan/table-plan.component";
import {ItineraryListComponent} from "./booking/booking-dashboard/itinerary-list/itinerary-list.component";
import {EmployeeComponent} from './master/employee/employee.component';
import {CheckListMasterComponent} from "./master/check-list/check-list-master.component";

export const DashboardRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'dashboard',
            component: DashboardComponent,
            canActivate: [AuthGuard]
        }, {
            path: 'roster',
            component: RosterComponent,
            canActivate: [AuthGuard]
        }, {
            path: 'roster',
            children: [
                {
                    path: 'eventAllocation/:id',
                    component: EventallocationComponent,
                    canActivate: [AuthGuard]
                }
            ]
        }, {
            path: 'master',
            component: MasterComponent,
            canActivate: [AuthGuard]
        }, {
            path: 'master',
            children: [
                {
                    path: 'driver',
                    component: DriverComponent,
                    canActivate: [AuthGuard]
                },
                {
                    path: 'employee',
                    component: EmployeeComponent,
                    canActivate: [AuthGuard]
                },
                {
                    path: 'eventTypeMaster',
                    component: EventTypeComponent,
                    canActivate: [AuthGuard]
                }, {
                    path: 'venueMaster',
                    component: VenueComponent,
                    canActivate: [AuthGuard]
                }, {
                    path: 'supplier',
                    component: SupplierComponent,
                    canActivate: [AuthGuard]
                }, {
                    path: 'itinerary',
                    component: ItineraryComponent,
                    canActivate: [AuthGuard]
                }, {
                    path: 'view-more',
                    component: ViewmoreComponent,
                    canActivate: [AuthGuard]
                }, {
                    path: 'package',
                    component: PackageComponent,
                    canActivate: [AuthGuard]
                }, {
                    path: 'package',
                    children: [
                        {
                            path: 'setup-package/:id',
                            component: SetupPackageComponent,
                            canActivate: [AuthGuard]
                        }
                    ]
                }, {
                    path: 'question-maker',
                    component: QuestionComponent,
                    canActivate: [AuthGuard]
                }, {
                    path: 'question-maker',
                    children: [
                        {
                            path: 'template/:id',
                            component: WalkTemplateComponent,
                            canActivate: [AuthGuard]
                        }
                    ]
                }, {
                    path: 'menu-items',
                    component: FoodMenuItemsComponent,
                    canActivate: [AuthGuard]
                }, {
                    path: 'create-menu',
                    component: MasterMenuComponent,
                    canActivate: [AuthGuard]
                }, {
                    path: 'check-list',
                    component: CheckListMasterComponent,
                    canActivate: [AuthGuard]
                }
            ]
        }, {
            path: 'event',
            component: EventComponent,
            canActivate: [AuthGuard]
        }, {
            path: 'enquiry',
            component: EnquiryComponent,
            canActivate: [AuthGuard]
        }, {
            path: 'enquiry',
            children: [{
                path: 'quote-step1/:id',
                component: QuoteStep1Component,
                canActivate: [AuthGuard]
            }, {
                path: 'walk-through/:id',
                component: WalkthroughComponent,
                canActivate: [AuthGuard]
            }, {
                path: 'book-now/:id',
                component: BookNowComponent,
                canActivate: [AuthGuard]
            }, {
                path: 'logger/:id',
                component: EventLoggerComponent,
                canActivate: [AuthGuard]
            }]
        }, {
            path: 'driver',
            component: DriverAllocation,
            canActivate: [AuthGuard]
        }, {
            path: 'transportVoucher',
            component: TransportVoucherComponent,
            canActivate: [AuthGuard]
        }, {
            path: 'booking',
            component: BookingComponent,
            canActivate: [AuthGuard]
        }, {
            path: 'booking',
            children: [{
                path: 'logger/:id',
                component: EventLoggerComponent,
                canActivate: [AuthGuard]
            }, {
                path: 'dashboard/:id',
                component: BookingDashboardComponent,
                canActivate: [AuthGuard]
            }, {
                path: 'dashboard/:id',
                children: [
                    {
                        path: 'check-list',
                        component: CheckListComponent,
                        canActivate: [AuthGuard]
                    }, {
                        path: 'itinerary-list',
                        component: ItineraryListComponent,
                        canActivate: [AuthGuard]
                    }, {
                        path: 'table-plan',
                        component: TablePlanComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            }]
        }]
    }
];

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MdModule} from '../md/md.module';
import {ScrollToModule} from 'ng2-scroll-to';

import {DashboardComponent} from './dashboard.component';
import {DashboardRoutes} from './dashboard.routing';
import {AgmCoreModule} from "@agm/core";
import {UserService} from "../services/user/UserService";
import {MasterComponent} from "./master/master.component";
import {VenueComponent} from "./master/venue/venue.component";
import {MasterService} from "../services/master/MasterService";
import {EventTypeComponent} from "./master/event-type/eventType.component";
import {EventComponent} from "./event/event.component";
import {SupplierComponent} from "./master/supplier/supplier.component";
import {ItineraryComponent} from "./master/itinerary/itinerary.component";
import {CategoryComponent} from "./master/itinerary/category.component";
import {BootstrapModalModule} from "ng2-bootstrap-modal";
import {SpaceRoomComponent} from "./master/venue/space-room.component";
import {ItemComponent} from "./master/itinerary/item.component";
import {EnquiryComponent} from "./enquiry/enquiry.component";
import {EnquiryService} from "../services/enquiry/EnquiryService";
import {ImageCropperComponent} from "ng2-img-cropper";
import {CropComponent} from "./crop/crop.component";
import {VsimgComponent} from "./master/venue/vsimg.component";
import {LoadingComponent} from "../components/loading/loading.component";
import {AddeventComponent} from "./master/event-type/addevent.component";
import {AllocatePopupComponent} from "./enquiry/allocatepopup.component";
import {ViewmoreComponent} from "./master/venue/viewmore.component";
import {SingleInputComponent} from "./common/single-input.component";
import {QuoteStep1Component} from "./event/quote-step1.component";
import {CalendarService} from "../services/calendar/CalendarService";
import {GooglePlaceModule} from 'ng2-google-place-autocomplete';
import {CalendarPopupComponent} from "./common/calendar-popup.component";
import {DashboardService} from "../services/dashboard/DashboardService";
import {QuestionComponent} from "./master/walkthrough/question.component";
import {CreateTemplateComponent} from "./master/walkthrough/create-template.component";
import {WalkThroughService} from "../services/enquiry/WalkThroughService";
import {WalkTemplateComponent} from "./master/walkthrough/walk-template.component";
import {PackageComponent} from "./master/package/package.component";
import {CreatePackageComponent} from "./master/package/create-package.component";
import {SetupPackageComponent} from "./master/package/setup-package.component";
import {Ng2DragDropModule} from "ng2-drag-drop";
import {CreateQuestionComponent} from "./master/walkthrough/create-question.component";
import {WalkthroughComponent} from "./enquiry/walkthrough.component";
import {PickTemplateComponent} from "./enquiry/pick-template.component";
import {TransportAllocationComponent} from "./enquiry/transportAllocationPopup.component"
import {DriverComponent} from "./master/driver/driver.component";
import {RosterComponent} from './roster/roster/roster.component';
import {EventallocationComponent} from './roster/eventallocation/eventallocation.component';
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {TooltipModule} from "ngx-tooltip";
import {PackageItemService} from "../util/package-item/PackageItemService";
import {ChangeWTemplateComponent} from "./enquiry/change-walkthrough/change-w-template.component";
import {CartPopupComponent} from "./shopping-cart/cart-popup/cart-popup.component";
import {ShoppingCartItemComponent} from "./shopping-cart/cart-items/shopping-cart-item.component";
import {DriverAllocation} from "./enquiry/transportAllocation.component";
import {TransportVoucherComponent} from "./voucher/transport/transport.voucher.component";
import {TransportVoucherPreviewComponent} from "./voucher/transport/transport.voucher.preview.component";
import {RosterService} from 'app/services/roster/roster.service';
import {BookNowComponent} from './booking/book-now/book-now.component';
import {MultipleImgUploadComponent} from './master/package/multiple-img-upload/multiple-img-upload.component';
import {CreateFoodMenuItemComponent} from './master/menuitem/create-menu-item/create-food-menu-item/create-food-menu-item.component';
import {FoodMenuItemsComponent} from './master/menuitem/menu-items/food-menu-items/food-menu-items.component';
import {MasterMenuComponent} from './master/menuitem/master-menu/master-menu.component';
import {CreateMasterMenuComponent} from './master/menuitem/master-menu/create-master-menu/create-master-menu.component';
import {PickMenuItemComponent} from './enquiry/pick-menu-item/pick-menu-item.component';
import {QuoteAnswerComponent} from './enquiry/quote-answer/quote-answer.component';
import {BookingComponent} from './booking/booking/booking.component';
import {BookingService} from "../services/booking/BookingService";
import {EventLoggerComponent} from './logger/event-logger/event-logger.component';
import {BookingDashboardComponent} from './booking/booking-dashboard/booking-dashboard.component';
import {ItineraryListComponent} from './booking/booking-dashboard/itinerary-list/itinerary-list.component';
import {CheckListComponent} from './booking/booking-dashboard/check-list/check-list.component';
import {TablePlanComponent} from './booking/booking-dashboard/table-plan/table-plan.component';
import {BookingDashboardHeaderComponent} from './booking/booking-dashboard/booking-dashboard-header/booking-dashboard-header.component';
import {EmployeeComponent} from './master/employee/employee.component';
import {EmployeeService} from 'app/services/employee/employee.service';
import {UploadTablePlanComponent} from './booking/booking-dashboard/table-plan/upload-table-plan/upload-table-plan.component';
import {FileSizePipe} from "../services/pipe/FileSizePipe";
import {CheckListMasterComponent} from "./master/check-list/check-list-master.component";
import {PickCheckListTemplateComponent} from './booking/booking-dashboard/check-list/pick-check-list-template/pick-check-list-template.component';
import {AddBookingChecklistItemComponent} from './booking/booking-dashboard/check-list/add-booking-checklist-item/add-booking-checklist-item.component';

@NgModule({
    imports: [
        CommonModule,
        GooglePlaceModule,
        RouterModule.forChild(DashboardRoutes),
        FormsModule,
        MdModule,
        BootstrapModalModule,
        BootstrapModalModule.forRoot({container: document.body}),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBtWIyzL04JiMjC3j_fgf-_OxlM4IfLFhM',
            libraries: ['places']
        }),
        ReactiveFormsModule,
        Ng2DragDropModule.forRoot(),
        TooltipModule,
        ScrollToModule.forRoot()
    ],
    declarations: [
        DashboardComponent,
        MasterComponent,
        EventTypeComponent,
        VenueComponent,
        EventComponent,
        SupplierComponent,
        ItineraryComponent,
        CategoryComponent,
        SpaceRoomComponent,
        ItemComponent,
        EnquiryComponent,
        ImageCropperComponent,
        CropComponent,
        VsimgComponent,
        LoadingComponent,
        AddeventComponent,
        AllocatePopupComponent,
        ViewmoreComponent,
        SingleInputComponent,
        QuoteStep1Component,
        CalendarPopupComponent,
        QuestionComponent,
        CreateTemplateComponent,
        WalkTemplateComponent,
        PackageComponent,
        CreatePackageComponent,
        SetupPackageComponent,
        CreateQuestionComponent,
        WalkthroughComponent,
        PickTemplateComponent,
        ShoppingCartComponent,
        ChangeWTemplateComponent,
        CartPopupComponent,
        ShoppingCartItemComponent,
        CreateFoodMenuItemComponent,
        FoodMenuItemsComponent,
        MasterMenuComponent,
        CreateMasterMenuComponent,
        TransportAllocationComponent,
        DriverComponent,
        DriverAllocation,
        TransportVoucherComponent,
        TransportVoucherPreviewComponent,
        RosterComponent,
        EventallocationComponent,
        ChangeWTemplateComponent,
        CartPopupComponent,
        ShoppingCartItemComponent,
        BookNowComponent,
        MultipleImgUploadComponent,
        PickMenuItemComponent,
        QuoteAnswerComponent,
        BookingComponent,
        EventLoggerComponent,
        BookingDashboardComponent,
        QuoteAnswerComponent,
        EmployeeComponent,
        BookingDashboardComponent,
        ItineraryListComponent,
        CheckListComponent,
        TablePlanComponent,
        BookingDashboardHeaderComponent,
        UploadTablePlanComponent,
        FileSizePipe,
        CheckListMasterComponent,
        PickCheckListTemplateComponent,
        AddBookingChecklistItemComponent

    ],
    entryComponents: [
        CategoryComponent,
        SpaceRoomComponent,
        ItemComponent,
        CropComponent,
        VsimgComponent,
        AddeventComponent,
        AllocatePopupComponent,
        SingleInputComponent,
        CalendarPopupComponent,
        CreateTemplateComponent,
        CreatePackageComponent,
        CreateQuestionComponent,
        PickTemplateComponent,
        TransportAllocationComponent,
        DriverComponent,
        PickTemplateComponent,
        EventallocationComponent,
        ChangeWTemplateComponent,
        MultipleImgUploadComponent,
        DriverAllocation,
        TransportVoucherPreviewComponent,
        CartPopupComponent,
        CreateFoodMenuItemComponent,
        CreateMasterMenuComponent,
        EmployeeComponent,
        UploadTablePlanComponent,
        PickCheckListTemplateComponent,
        AddBookingChecklistItemComponent
    ],
    providers: [
        UserService,
        DashboardService,
        MasterService,
        EnquiryService,
        CalendarService,
        WalkThroughService,
        PackageItemService,
        RosterService,
        BookingService,
        RosterService,
        EmployeeService
    ]
})

export class DashboardModule {
}

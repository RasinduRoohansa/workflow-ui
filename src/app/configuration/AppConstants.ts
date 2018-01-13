import {Injectable} from "@angular/core";

/**
 * @author Stelan Briyan
 */

const ADMIN_PATH = '/api/admin/';
const DASHBOARD_PATH = '/api/dashboard/';
const ROSTER_PATH = '/api/roster/';

@Injectable()
export class AppConstants {

    private _loginURL: string;
    private _lockURL: string;
    private _authURL: string;
    private _baseURL: string;

    private _refreshTokenURL: string;
    private _socialLogin: string;
    private _findUser: string;
    private _findMenuByUsername: string;
    private _findAllUsers: string;
    private _activateUser: string;
    private _deactivateUser: string;
    private _saveRole: string;
    private _findActiveUsers: string;
    private _findActiveRole: string;
    private _findUserRoleMapper: string;
    private _assignRole: string;
    private _findMenus: string;
    private _assignMenuToRole: string;
    private _assignSubMenuToRole: string;
    private _saveEventType: string;
    private _findAllEventTypes: string;
    private _updateEventType: string;
    private _saveVenue: string;
    private _findAllVenue: string;
    private _updateUser: string;
    private _saveUser: string;
    private _saveVenueSpace: string;
    private _updateVenueSpace: string;
    private _findVenueSpace: string;
    private _saveCategory: string;
    private _findActiveCategory: string;
    private _saveItem: string;
    private _findItem: string;
    private _findItemByCategory: string;
    private _saveSupplier: string;
    private _findAllSupplier: string;
    private _saveImageForVenueSpace: string;
    private _findAccessCode: string;
    private _findUsersByAccessCode: string;
    private _findSystemFeaturesByUser: string;
    private _findSystemFeatures: string;
    private _findPrivillegesByUserId: string;
    private _savePrivileges: string;
    private _deletePrivilege: string;
    private _findUsersByRoleGroup: string;
    private _findVenueSpaceBySpaceId: string;
    private _facility: string;
    private _findFacility: string;
    private _findCalendarByUsername: string;
    private _reserveTimeWalkThrough: string;
    private _findDashboardSummery: string;
    private _findActiveSupplier: string;

    private _getNotAllocatedEnquiry: string;
    private _findEnquiryById: string;
    private _findReserveTimeWalkThrough: string;
    private _allocateEnquiry: string;
    private _getAllocatedEnquiry: string;
    private _getEnquiry: string;
    private _getAllocatedEnquiryByUsers: string;
    private _findImage: string;
    private _findActiveEventTypes: string;
    private _savePackageItem: string;
    private _findPackageItem: string;
    private _activatePackage: string;
    private _deactivatePackage: string;
    private _saveImageForPackages: string;

    private _findCheckListTemplateByEventType: string;

    private _createPackage: string;
    private _getAllPackages: string;
    private _findPackageById: string;
    private _activateVenueSpace: string;
    private _deactivateVenueSpace: string;
    private _findPackageImages: string;
    private _findSystemTax: string;

    /**
     * roster
     */
    private _findAllBookings: string;
    private _findNextBooking: string;
    private _getAllAvailableEmployees: string;
    private _getEventDetails: string;
    private _saveEmployeeMapper: string;
    private _updateEmployee: string;
    private _findEmployeeByID: string;

    /**
     * Employee
     */
    private _saveEmployee: string;
    private _findAllEmployees: string;
    private _filterEmployees: string;
    private _findAllEmployeeTypes: string;



    private _findAllDriver:string;
    private _saveDriver: string;
    private _findActiveDriver:string;
    private _allocateDriver:string;
    private _getAllocatedDriver:string;
    private _unAllocateTransport:string;
    private _getTransportVoucherList:string;
    private _getEnquiryByWalkThroughId:string;

    /**
     * Menu Item
     */
    private _findActiveMasterMainMenuCategories: string;
    private _findActiveMasterSubMenuCategories: string;
    private _saveFoodMenuItem: string;
    private _findAllActiveMenuItems: string;
    private _saveMasterMenu: string;
    private _findActiveAllMenus: string;
    private _findMenuItemsByMenuId: string;

    private _createBookingByWalkThrough: string;
    private _findAllBooking: string;
    private _findBookingById: string;
    private _uploadTablePlan: string;
    private _findTablePlanHeader: string;
    private _findTablePlan: string;
    private _createBookingCheckListTemplate: string;
    private _findBookingCheckListTemplate: string;
    private _findBookingCheckListTemplateItem: string;
    private _checkBookingCheckListItemDone: string;
    private _saveBookingCheckListItem: string;

    private _findActLogByEnquiryId: string;

    constructor() {
        this._authURL = 'http://localhost:9005';
        // this._authURL = 'http://188.166.229.4:9005';
        this._baseURL = 'http://localhost:9000';
        // this._baseURL = 'http://188.166.229.4:9000';

        this._refreshTokenURL = this._authURL + '/refreshToken';
        this._socialLogin = this._authURL + '/socialLogin';

        this._lockURL = 'pages/lock';
        this._loginURL = 'pages/login';

        this._findUser = ADMIN_PATH + 'user/findUser/${username}';
        this._updateUser = ADMIN_PATH + 'user/updateUser';
        this._saveUser = ADMIN_PATH + 'user/saveUser';
        this._findAllUsers = ADMIN_PATH + 'user/findAllUsers';
        this._findMenuByUsername = ADMIN_PATH + 'user/findMenuByUsername';
        this._activateUser = ADMIN_PATH + 'user/activateUser/${id}';
        this._deactivateUser = ADMIN_PATH + 'user/deactivateUser/${id}';
        this._saveRole = ADMIN_PATH + 'user/saveRole';
        this._findActiveUsers = ADMIN_PATH + 'user/findActiveUsers';
        this._findActiveRole = ADMIN_PATH + 'user/findActiveRole';
        this._findUserRoleMapper = ADMIN_PATH + 'user/findUserRoleMapper/${id}';
        this._assignRole = ADMIN_PATH + 'user/assignRole/${roleId}/${userId}/${status}';
        this._findMenus = ADMIN_PATH + 'user/findMenus/${roleId}';
        this._assignMenuToRole = ADMIN_PATH + 'user/assignMenuToRole/${roleId}/${menuId}/${status}';
        this._assignSubMenuToRole = ADMIN_PATH + 'user/assignSubMenuToRole/${roleId}/${submenuId}/${status}';
        this._findAccessCode = ADMIN_PATH + 'user/findAccessCode/${username}';
        this._findUsersByAccessCode = ADMIN_PATH + 'user/findUsersByAccessCode/${code}';
        this._findSystemFeaturesByUser = ADMIN_PATH + 'user/findSystemFeaturesByUser/${username}';
        this._findSystemFeatures = ADMIN_PATH + 'user/findSystemFeatures';
        this._findPrivillegesByUserId = ADMIN_PATH + 'user/findPrivillegesByUserId/${fkUser}';
        this._savePrivileges = ADMIN_PATH + 'user/savePrivileges';
        this._deletePrivilege = ADMIN_PATH + 'user/deletePrivilege/${id}';
        this._findUsersByRoleGroup = ADMIN_PATH + 'user/findUsersByRoleGroup/${code}';

        // master
        this._saveEventType = DASHBOARD_PATH + 'master/saveEventType';
        this._findActiveEventTypes = DASHBOARD_PATH + 'master/findActiveEventTypes';
        this._findFacility = DASHBOARD_PATH + 'master/findFacility/${spaceId}';
        this._facility = DASHBOARD_PATH + 'master/saveFacility';
        this._findAllEventTypes = DASHBOARD_PATH + 'master/findAllEventTypes';
        this._updateEventType = DASHBOARD_PATH + 'master/updateEventType';
        this._saveVenue = DASHBOARD_PATH + 'master/saveVenue';
        this._findAllVenue = DASHBOARD_PATH + 'master/findAllVenue';
        this._saveVenueSpace = DASHBOARD_PATH + 'master/saveVenueSpace';
        this._updateVenueSpace = DASHBOARD_PATH + 'master/updateVenueSpace';
        this._saveImageForVenueSpace = DASHBOARD_PATH + 'master/saveImageForVenueSpace';
        this._findVenueSpace = DASHBOARD_PATH + 'master/findVenueSpace/${fkVenue}';
        this._findVenueSpaceBySpaceId = DASHBOARD_PATH + 'master/findVenueSpaceBySpaceId/${fkSpace}';
        this._activateVenueSpace = DASHBOARD_PATH + 'master/activateVenueSpace/${id}';
        this._deactivateVenueSpace = DASHBOARD_PATH + 'master/deactivateVenueSpace/${id}';
        this._saveCategory = DASHBOARD_PATH + 'item/saveCategory';
        this._findActiveCategory = DASHBOARD_PATH + 'item/findActiveCategory';
        this._saveItem = DASHBOARD_PATH + 'item/saveItem';
        this._findItem = DASHBOARD_PATH + 'item/findItem';
        this._findItemByCategory = DASHBOARD_PATH + 'item/findItemByCategory/${fkCategory}';
        this._saveSupplier = DASHBOARD_PATH + 'supplier/saveSupplier';
        this._findAllSupplier = DASHBOARD_PATH + 'supplier/findAllSupplier';
        this._findActiveSupplier = DASHBOARD_PATH + 'supplier/findActiveSupplier';

        this._findCalendarByUsername = DASHBOARD_PATH + 'calendar/findCalendarByUser/${username}';

        this._getNotAllocatedEnquiry = DASHBOARD_PATH + 'enquiry/getNotAllocatedEnquiry';
        this._reserveTimeWalkThrough = DASHBOARD_PATH + 'enquiry/reserveTimeWalkThrough';
        this._findEnquiryById = DASHBOARD_PATH + 'enquiry/getEnquiryById/${id}';
        this._findReserveTimeWalkThrough = DASHBOARD_PATH + 'enquiry/findReserveTimeWalkThrough/${id}';
        this._allocateEnquiry = DASHBOARD_PATH + 'enquiry/allocateEnquiry';
        this._getAllocatedEnquiry = DASHBOARD_PATH + 'enquiry/getAllocatedEnquiry';
        this._getEnquiry = DASHBOARD_PATH + 'enquiry/getEnquiry/${status}';
        this._getAllocatedEnquiryByUsers = DASHBOARD_PATH + 'enquiry/getAllocatedEnquiryByUsers/${username}';
        this._getEnquiryByWalkThroughId = DASHBOARD_PATH + 'enquiry/getEnquiryByWalkThroughId/${id}';
        this._findImage = DASHBOARD_PATH + 'file/findImage/${id}';

        this._findDashboardSummery = DASHBOARD_PATH + 'findDashboardSummery';
        this._createPackage = DASHBOARD_PATH + 'package/createPackage';
        this._getAllPackages = DASHBOARD_PATH + 'package/getAllPackages';
        this._findPackageById = DASHBOARD_PATH + 'package/findPackageById/${id}';
        this._savePackageItem = DASHBOARD_PATH + 'package/savePackageItem';
        this._findPackageItem = DASHBOARD_PATH + 'package/findPackageItem/${id}';
        this._activatePackage = DASHBOARD_PATH + 'package/activatePackage/${id}';
        this._deactivatePackage = DASHBOARD_PATH + 'package/deactivatePackage/${id}';
        this._findPackageImages = DASHBOARD_PATH + 'package/findPackageImages/${id}';
        this._saveImageForPackages = DASHBOARD_PATH + 'package/saveImageForPackages';

        this._findCheckListTemplateByEventType = DASHBOARD_PATH + 'check-list/findCheckListTemplateByEventType/${fkEventType}';

        this._findSystemTax = DASHBOARD_PATH + 'finance/findSystemTax';


        this._findAllDriver = DASHBOARD_PATH + 'driver/findAllDriver';
        this._saveDriver = DASHBOARD_PATH + 'driver/saveDriver';
        this._findActiveDriver=DASHBOARD_PATH+'driver/findActiveDriver';
        this._allocateDriver = DASHBOARD_PATH + 'enquiry/allocateDriver';
        this._getAllocatedDriver = DASHBOARD_PATH + 'enquiry/getEnquiryForDriverAllocation/${status}';
        this._unAllocateTransport=DASHBOARD_PATH+'enquiry/unAllocateTransport';
        this._getTransportVoucherList=DASHBOARD_PATH+'transportVoucher/getTransportVoucherList'
        /**
         * roster
         */
        this._findAllBookings = ROSTER_PATH + 'roasterBookingAPI/getAllActiveCustomBooking';
        this._getAllAvailableEmployees = ROSTER_PATH + 'eventEmployeeAllocation/getAvailableEmployees/'
        this._getEventDetails = ROSTER_PATH + 'eventEmployeeAllocation/getRosterEventAllocationByBookingId/'
        this._saveEmployeeMapper = ROSTER_PATH + 'eventEmployeeMap/addEventEmployeeMapper'

        /**
         * employee
         */
        this._saveEmployee = ROSTER_PATH + 'employeeAPI/saveEmployeeMapper'
        this._findAllEmployees = ROSTER_PATH + 'employeeAPI/findAllEmployees'
        this._filterEmployees = ROSTER_PATH + 'employeeAPI/filterEmployees/'
        this._updateEmployee = ROSTER_PATH + 'employeeAPI/updateEmployeeMapper'
        this._findEmployeeByID = ROSTER_PATH + 'employeeAPI/findEmployeeByID/'
        this._findAllEmployeeTypes = ROSTER_PATH + 'employeeType/findAllEmployeeType'



        this._findAllBookings = ROSTER_PATH + 'bookingService/getAllActiveCustomBooking';
        /**
         * Menu Item
         */
        this._findActiveMasterMainMenuCategories = DASHBOARD_PATH + 'menuItem/findActiveMasterMainMenuCategories';
        this._findActiveMasterSubMenuCategories = DASHBOARD_PATH + 'menuItem/findActiveMasterSubMenuCategories/${id}';
        this._saveFoodMenuItem = DASHBOARD_PATH + 'menuItem/saveMasterMenuItem';
        this._findAllActiveMenuItems = DASHBOARD_PATH + 'menuItem/findAllActiveMenuItems'
        this._saveMasterMenu = DASHBOARD_PATH + 'menuItem/saveMasterMenu'
        this._findActiveAllMenus = DASHBOARD_PATH+'menuItem/findActiveAllMenus'
        this._findMenuItemsByMenuId = DASHBOARD_PATH + 'menuItem/findMenuItemsByMenuId/${id}';


        this._createBookingByWalkThrough = DASHBOARD_PATH + 'booking/createBookingByWalkThrough';
        this._findAllBooking = DASHBOARD_PATH + 'booking/findAllBookings';
        this._findNextBooking = DASHBOARD_PATH + 'booking/findNextBooking';
        this._findBookingById = DASHBOARD_PATH + 'booking/findBookingById/${id}';
        this._uploadTablePlan = DASHBOARD_PATH + 'booking/uploadTablePlan/${fkBooking}/${username}';
        this._findTablePlanHeader = DASHBOARD_PATH + 'booking/findTablePlanHeader/${fkBooking}';
        this._findTablePlan = DASHBOARD_PATH + 'booking/findTablePlan/${fkDocument}';
        this._createBookingCheckListTemplate = DASHBOARD_PATH + 'booking/createBookingCheckListTemplate';
        this._findBookingCheckListTemplate = DASHBOARD_PATH + 'booking/findBookingCheckListTemplate/${fkBooking}';
        this._findBookingCheckListTemplateItem = DASHBOARD_PATH + 'booking/findBookingCheckListTemplateItem/${fkBooking}';
        this._checkBookingCheckListItemDone = DASHBOARD_PATH + 'booking/checkBookingCheckListItemDone/${fkId}';
        this._saveBookingCheckListItem = DASHBOARD_PATH + 'booking/saveBookingCheckListItem';

        this._findActLogByEnquiryId = DASHBOARD_PATH + 'activity-log/findActLogByEnquiryId/${id}';
    }


    get saveBookingCheckListItem(): string {
        return this._saveBookingCheckListItem;
    }

    get checkBookingCheckListItemDone(): string {
        return this._checkBookingCheckListItemDone;
    }

    get findBookingCheckListTemplateItem(): string {
        return this._findBookingCheckListTemplateItem;
    }

    get findBookingCheckListTemplate(): string {
        return this._findBookingCheckListTemplate;
    }

    get createBookingCheckListTemplate(): string {
        return this._createBookingCheckListTemplate;
    }

    get findCheckListTemplateByEventType(): string {
        return this._findCheckListTemplateByEventType;
    }

    get findTablePlan(): string {
        return this._findTablePlan;
    }

    get findTablePlanHeader(): string {
        return this._findTablePlanHeader;
    }

    get uploadTablePlan(): string {
        return this._uploadTablePlan;
    }

    get findBookingById(): string {
        return this._findBookingById;
    }

    get findNextBooking(): string {
        return this._findNextBooking;
    }

    get getEnquiryByWalkThroughId(): string {
        return this._getEnquiryByWalkThroughId;
    }

    get findAllBooking(): string {
        return this._findAllBooking;
    }

    get findActLogByEnquiryId(): string {
        return this._findActLogByEnquiryId;
    }

    get createBookingByWalkThrough(): string {
        return this._createBookingByWalkThrough;
    }

    get findMenuItemsByMenuId(): string {
        return this._findMenuItemsByMenuId;
    }

    get findPackageImages(): string {
        return this._findPackageImages;
    }

    get saveImageForPackages(): string {
        return this._saveImageForPackages;
    }

    get findAllBookings():string {
        return this._findAllBookings;
    }

    get findReserveTimeWalkThrough(): string {
        return this._findReserveTimeWalkThrough;
    }


    get activatePackage(): string {
        return this._activatePackage;
    }

    get deactivatePackage(): string {
        return this._deactivatePackage;
    }

    get findSystemTax(): string {
        return this._findSystemTax;
    }

    get findPackageItem(): string {
        return this._findPackageItem;
    }

    get savePackageItem(): string {
        return this._savePackageItem;
    }

    get findPackageById(): string {
        return this._findPackageById;
    }

    get activateVenueSpace(): string {
        return this._activateVenueSpace;
    }

    get deactivateVenueSpace(): string {
        return this._deactivateVenueSpace;
    }

    get getAllPackages(): string {
        return this._getAllPackages;
    }

    get createPackage(): string {
        return this._createPackage;
    }

    get findActiveSupplier(): string {
        return this._findActiveSupplier;
    }

    get findActiveEventTypes(): string {
        return this._findActiveEventTypes;
    }

    get findDashboardSummery(): string {
        return this._findDashboardSummery;
    }

    get findCalendarByUsername(): string {
        return this._findCalendarByUsername;
    }

    get getEnquiry(): string {
        return this._getEnquiry;
    }

    get findFacility(): string {
        return this._findFacility;
    }

    get facility(): string {
        return this._facility;
    }

    get reserveTimeWalkThrough(): string {
        return this._reserveTimeWalkThrough;
    }

    get findVenueSpaceBySpaceId(): string {
        return this._findVenueSpaceBySpaceId;
    }

    get socialLogin(): string {
        return this._socialLogin;
    }

    get findUsersByRoleGroup(): string {
        return this._findUsersByRoleGroup;
    }

    get deletePrivilege(): string {
        return this._deletePrivilege;
    }

    get savePrivileges(): string {
        return this._savePrivileges;
    }

    get findPrivillegesByUserId(): string {
        return this._findPrivillegesByUserId;
    }

    get findSystemFeaturesByUser(): string {
        return this._findSystemFeaturesByUser;
    }

    get findImage(): string {
        return this._findImage;
    }

    get findSystemFeatures(): string {
        return this._findSystemFeatures;
    }

    get getAllocatedEnquiryByUsers(): string {
        return this._getAllocatedEnquiryByUsers;
    }

    get getAllocatedEnquiry(): string {
        return this._getAllocatedEnquiry;
    }

    get findUsersByAccessCode(): string {
        return this._findUsersByAccessCode;
    }

    get allocateEnquiry(): string {
        return this._allocateEnquiry;
    }

    get findAccessCode(): string {
        return this._findAccessCode;
    }

    get authURL(): string {
        return this._authURL;
    }

    get updateVenueSpace(): string {
        return this._updateVenueSpace;
    }

    get saveUser(): string {
        return this._saveUser;
    }

    get loginURL(): string {
        return this._loginURL;
    }

    get updateUser(): string {
        return this._updateUser;
    }

    get findEnquiryById(): string {
        return this._findEnquiryById;
    }

    get lockURL(): string {
        return this._lockURL;
    }

    get findUser(): string {
        return this._findUser;
    }

    get findMenuByUsername(): string {
        return this._findMenuByUsername;
    }

    get baseURL(): string {
        return this._baseURL;
    }

    get refreshTokenURL(): string {
        return this._refreshTokenURL;
    }

    get findAllUsers(): string {
        return this._findAllUsers;
    }

    get activateUser(): string {
        return this._activateUser;
    }

    get deactivateUser(): string {
        return this._deactivateUser;
    }

    get saveRole(): string {
        return this._saveRole;
    }

    get findActiveUsers(): string {
        return this._findActiveUsers;
    }

    get findActiveRole(): string {
        return this._findActiveRole;
    }

    get findUserRoleMapper(): string {
        return this._findUserRoleMapper;
    }

    get assignRole(): string {
        return this._assignRole;
    }

    get findMenus(): string {
        return this._findMenus;
    }

    get assignMenuToRole(): string {
        return this._assignMenuToRole;
    }

    get assignSubMenuToRole(): string {
        return this._assignSubMenuToRole;
    }

    get saveEventType(): string {
        return this._saveEventType;
    }

    get findAllEventTypes(): string {
        return this._findAllEventTypes;
    }

    get updateEventType(): string {
        return this._updateEventType;
    }

    get saveVenue(): string {
        return this._saveVenue;
    }

    get findAllVenue(): string {
        return this._findAllVenue;
    }

    get saveVenueSpace(): string {
        return this._saveVenueSpace;
    }

    get findVenueSpace(): string {
        return this._findVenueSpace;
    }

    get saveCategory(): string {
        return this._saveCategory;
    }

    get findActiveCategory(): string {
        return this._findActiveCategory;
    }

    get saveItem(): string {
        return this._saveItem;
    }

    get findItem(): string {
        return this._findItem;
    }

    get findItemByCategory(): string {
        return this._findItemByCategory;
    }

    get saveSupplier(): string {
        return this._saveSupplier;
    }

    get findAllSupplier(): string {
        return this._findAllSupplier;
    }

    get getNotAllocatedEnquiry(): string {
        return this._getNotAllocatedEnquiry;
    }

    get saveImageForVenueSpace(): string {
        return this._saveImageForVenueSpace;
    }
    get findAllDriver():string {
        return this._findAllDriver;
    }

    get saveDriver(): string {
        return this._saveDriver;
    }

    get findActiveDriver():string{
        return this._findActiveDriver;
    }

    get allocateDriver(): string {
        return this._allocateDriver;
    }

    get getAllocatedDriver(): string {
        return this._getAllocatedDriver;
    }

    get unAllocateTransport(): string {
        return this._unAllocateTransport;
    }
    get getTransportVoucherList(): string {
        return this._getTransportVoucherList;
    }
    get findActiveMasterSubMenuCategories(): string {
        return this._findActiveMasterSubMenuCategories;
    }


    get saveFoodMenuItem(): string {
        return this._saveFoodMenuItem;
    }

    get findAllActiveMenuItems(): string {
        return this._findAllActiveMenuItems;
    }

    get findActiveMasterMainMenuCategories(): string {
        return this._findActiveMasterMainMenuCategories;
    }

    get saveMasterMenu(): string {
        return this._saveMasterMenu;
    }

    get findActiveAllMenus(): string {
        return this._findActiveAllMenus;
    }

    get getAllAvailableEmployees():string {
        return this._getAllAvailableEmployees;
    }

    get getEventDetails(): string{
        return this._getEventDetails;
    }

    get saveEmployeeMapper(): string{
        return this._saveEmployeeMapper;
    }

    get saveEmployee(): string{
        return this._saveEmployee;
    }

    get findAllEmployees(): string{
        return this._findAllEmployees;
    }

    get filterEmployees(): string{
        return this._filterEmployees;
    }

    get findEmployeeByID(): string{
        return this._findEmployeeByID;
    }

    get updateEmployee(): string{
        return this._updateEmployee;
    }

    get findAllEmployeeTypes(): string{
        return this._findAllEmployeeTypes;
    }
}

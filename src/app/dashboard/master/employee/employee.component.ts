import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../../configuration/AppConstants';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogService } from 'ng2-bootstrap-modal';
import { Store } from '../../../util/Store';
import { EmployeeService } from '../../../services/employee/employee.service';
import { AUTH } from '../../../util/Constants';
import { CropComponent } from '../../crop/crop.component';

/**
 * @author Sathya
 * @since 05-01-2018
 */

declare var swal: any;
declare var $: any;

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {


    private DriverComponent = {
        image: null,
        createdBy: null, update: false
    };

    private image: any;
    private employee: any;
    private employeeUpdate: any;
    private employeeUpdateList: any;
    private employeeList: any;
    public searchText: '';
    private tempEmployee: any;
    private employeeTypeList: any;



    constructor(private appConstant: AppConstants,
        private store: Store,
        private employeeService: EmployeeService,
        private dialogService: DialogService,
        private _sanitizer: DomSanitizer) {
        this.employee = {
            createdBy: this.store.getData(AUTH.username)
        };
        this.employeeUpdate = {
            createdBy: this.store.getData(AUTH.username)
        };
    }

    ngOnInit() {

        this.findAllEmployees();
        this.findAllEmployeeTypes();
    }

    selectImg() {
        this.dialogService.addDialog(CropComponent, {
            title: 'Crop Image',
            message: '',
            cwidth: 26,
            cheight: 20,
            croppedWidth: 259,
            croppedHeight: 200
        }).subscribe((res) => {
            if (res) {
                this.image = res;
                this.employee.image = this.image.image;
            }
        });
    }
    saveEmployee() {
        this.employee.createdBy = this.store.getData(AUTH.username);
        this.employeeService.saveEmployee(this.employee)
            .subscribe(res => {
                swal({
                    type: "success",
                    title: "Success!",
                    text: "New supplier is added!",
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success"
                });
                this.ngOnInit();
                this.findAllEmployees();
                this.findAllEmployeeTypes();
                this.image = null;
            });
    }

    findAllEmployees() {
        this.employeeService.findAllEmployees()
            .subscribe(res => {
                this.employeeList = res;
            });
    }

    filterEmployees() {
        this.employeeService.filterEmployees(this.searchText)
            .subscribe(res => {
                this.employeeList = res;
            });
    }

    updateEmployee() {
        this.employeeService.updateEmployee(this.employeeUpdate)
            .subscribe(res => {
                swal({
                    type: "success",
                    title: "Success!",
                    text: "New supplier is added!",
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success"
                });
                this.ngOnInit();
                this.findAllEmployees();
                this.image = null;
            })
    }

    getUpdateEmployee(id) {
        this.employeeService.findEmployeeByID(id)
            .subscribe(res => {
                this.employeeUpdateList = res;
            });
    }

    findAllEmployeeTypes() {
        this.employeeService.findAllEmployeeTypes()
            .subscribe(res => {
                this.employeeTypeList = res;
                setTimeout(() => {
                    $(".selectpicker").selectpicker('refresh');
                }, 150);
            });
    }



}

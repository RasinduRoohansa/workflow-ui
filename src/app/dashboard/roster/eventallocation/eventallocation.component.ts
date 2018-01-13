import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import { DialogWrapperComponent } from 'ng2-bootstrap-modal/dist/dialog-wrapper.component';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { RosterService } from 'app/services/roster/roster.service';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-eventallocation',
  templateUrl: './eventallocation.component.html',
  styleUrls: ['./eventallocation.component.css']
})
export class EventallocationComponent implements OnInit {


  idParsedByUrl: number;
  private sub: any;
  public eventDetails: any;
  public availableEmpoyees = [];
  public saveArr = [];

  constructor(dialogService: DialogService,
    private router: Router,
    private rosterService: RosterService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.idParsedByUrl = this.route.snapshot.params['id'];
    this.getEventDetail(this.idParsedByUrl);
  }

  redirect() {
    this.router.navigateByUrl('/roster');
  }

  getAllAvailableEmployees(empType) {
    this.rosterService.getAllAvaiableEmployees(empType)
      .subscribe(res => {
        this.availableEmpoyees = res;
      });
  }


  selectEmployee(item) {
    if (item.selected == true) {
      item.selected = false;
    } else {
      item.selected = true;
    }
  }

  getEventDetail(id) {
    this.rosterService.getEventDetails(id)
    .subscribe(res => {
      this.eventDetails = res;
    });
  }

  
  save(){
    this.availableEmpoyees.forEach(item =>{
        if(item.selected == true){
          let list: any = {
            "createdBy": this.eventDetails.createdBy,
            "empID": item.id,
            "empTypeId":item.employeeTypeId,
            "eventId": this.idParsedByUrl
          }
          this.rosterService.saveEmployeeMapper(list)
          .subscribe(res => {
            this.eventDetails = res;
          });
          this.redirect();
        }

    });
  }

}

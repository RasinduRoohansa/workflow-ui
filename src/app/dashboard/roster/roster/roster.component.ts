import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { EventallocationComponent } from 'app/dashboard/roster/eventallocation/eventallocation.component';
import { RosterService } from 'app/services/roster/roster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {

  private bookings = [];

  constructor(private rosterService: RosterService,
    private router: Router) {
  }

  ngOnInit() {
    this.findAllBokings();
  }

  findAllBokings() {
    this.rosterService.findAllBookings()
      .subscribe(res => {
        this.bookings = res;
      });
  }

  navigateToAllocation(id){
    this.router.navigate(['/roster/eventAllocation/' + id]);
  }
}

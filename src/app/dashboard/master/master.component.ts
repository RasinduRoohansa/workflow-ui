import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'masters',
    templateUrl: './master.component.html',
    styleUrls: ['master.component.css']
})
export class MasterComponent {

    constructor(private router: Router) {

    }

    navigateToMaster(masterId) {
        this.router.navigate(['/master/' + masterId]);
    }

}
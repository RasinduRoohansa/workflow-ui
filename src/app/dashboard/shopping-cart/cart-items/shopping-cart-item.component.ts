import {AfterViewInit, Component, Input} from "@angular/core";
import {WalkThroughService} from "../../../services/enquiry/WalkThroughService";
import {DomSanitizer} from "@angular/platform-browser";

declare var require: any;
declare var $: any;

@Component({
    selector: 'shopping-cart-items',
    templateUrl: './shopping-cart-item.component.html',
    styleUrls: ['shopping-cart-item.component.css']
})
export class ShoppingCartItemComponent implements AfterViewInit {

    @Input("fkWalkThroughId") fkWalkThroughId: number;
    @Input("referenceParent") parentComponent: any;

    private total: any;
    private packageItems: any;

    constructor(private _sanitizer: DomSanitizer,
                private walkThroughService: WalkThroughService) {
    }

    findCartPackageItems() {
        this.walkThroughService.findCartPackageItems(this.fkWalkThroughId)
            .subscribe(res => {
                this.findCartSummeryDetail();
                this.packageItems = res;
            });
    }

    findCartSummeryDetail() {
        this.walkThroughService.findCartSummeryDetail(this.fkWalkThroughId)
            .subscribe(res => {
                this.total = res.total;
            });
    }

    ngAfterViewInit(): void {
        this.findCartPackageItems();
    }

    hideCartItem() {
        this.parentComponent.viewCartItemMode = false;
    }

    getImage(image) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(image);
    }

}
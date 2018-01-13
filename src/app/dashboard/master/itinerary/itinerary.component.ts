import {Component, OnInit} from "@angular/core";
import {DialogService} from "ng2-bootstrap-modal";
import {CategoryComponent} from "./category.component";
import {MasterService} from "../../../services/master/MasterService";
import {ItemComponent} from "./item.component";
import {DomSanitizer} from "@angular/platform-browser";

declare var $: any;

@Component({
    selector: 'supplier',
    templateUrl: './itinerary.component.html'
})
export class ItineraryComponent extends OnInit {
    private categories: any;
    private items: any;

    private searchText: string;
    private itemsInit: any;

    private selectedCategoryId: number;

    constructor(private _sanitizer: DomSanitizer,
                private dialogService: DialogService,
                private masterService: MasterService) {
        super();
        this.findActiveCategory();
        this.findItem();
    }

    ngOnInit(): void {
    }

    findActiveCategory() {
        this.masterService.findActiveCategory()
            .subscribe(res => {
                this.categories = res;
            });
    }

    filterItem() {
        if (this.searchText == '') {
            this.items = this.itemsInit;
        } else {
            this.items = this.itemsInit.filter(item => {
                return (item.itemName && item.itemName.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0)
                    || (item.description && item.description.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0)
                    || (item.category && item.category.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0);
            });
        }
    }

    findItem() {
        this.selectedCategoryId = 0;
        this.masterService.findItem()
            .subscribe(res => {
                this.items = res;
                this.itemsInit = res;
            });
    }

    findItemByCategory(id) {
        this.selectedCategoryId = id;
        this.masterService.findItemByCategory(id)
            .subscribe(res => {
                this.items = res;
                this.itemsInit = res;
            });
    }

    addCategory() {
        this.dialogService.addDialog(CategoryComponent, {
            title: 'Add Category',
            message: ''
        }).subscribe((isConfirmed) => {
            //We get dialog result
            if (isConfirmed) {
                this.findActiveCategory();
            } else {

            }
        });
    }

    addItem() {
        this.dialogService.addDialog(ItemComponent, {
            categoryId: this.selectedCategoryId,
            update: false
        }).subscribe((isConfirmed) => {
            if (isConfirmed) {
                if (this.selectedCategoryId == 0) {
                    this.findItem();
                } else {
                    this.findItemByCategory(this.selectedCategoryId);
                }
            }
        });
    }

    updateItem(item) {
        this.dialogService.addDialog(ItemComponent, {
            updateItem: item,
            update: true
        }).subscribe((isConfirmed) => {
            //We get dialog result
            if (isConfirmed) {
                if (this.selectedCategoryId == 0) {
                    this.findItem();
                } else {
                    this.findItemByCategory(this.selectedCategoryId);
                }
            }
        });
    }

    getImage(image) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(image);
    }
}
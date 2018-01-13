import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "ng2-bootstrap-modal";
import {DomSanitizer} from "@angular/platform-browser";
import {MasterService} from "../../../services/master/MasterService";
import {Store} from "../../../util/Store";
import {AUTH} from "../../../util/Constants";
import {EnquiryService} from "../../../services/enquiry/EnquiryService";

declare var swal: any;
declare var $: any;

@Component({
    selector: 'create-package',
    templateUrl: './setup-package.component.html',
    styleUrls: ['image-view.component.css']
})
export class SetupPackageComponent extends OnInit {

    private searchText = '';

    private packageId: any;
    private packageById: any;
    private selectedCategoryId: any;
    private categories = [];

    private images: any;
    private selectedImg: any;

    private items = [];

    private notDroppedItems = [];
    private droppedItems = [];

    private packageTax = 0;
    private packageMarkup = 0;
    private packageTotal = 0;

    private packageItemEditMode = false;

    constructor(private _sanitizer: DomSanitizer,
                private router: ActivatedRoute,
                private route: Router,
                private enquiryService: EnquiryService,
                private store: Store,
                private dialogService: DialogService,
                private masterService: MasterService) {
        super();
        this.findActiveCategory();
    }

    findActiveCategory() {
        this.masterService.findActiveCategory()
            .subscribe(res => {
                this.categories = res;
                setTimeout(() => {
                    $(".selectpicker").selectpicker('refresh');
                }, 150);
            });
    }

    findPackageImages() {
        this.masterService.findPackageImages(this.packageId)
            .subscribe(res => {
                this.images = res;
            });
    }

    viewDragAndDrop() {
        this.packageItemEditMode = true;
        setTimeout(() => {
            $(".selectpicker").selectpicker('refresh');
        }, 150);
    }

    goBack() {
        this.findPackageItem();
        this.filterItem();
        this.packageItemEditMode = false;
    }

    ngOnInit(): void {
        this.packageId = this.router.snapshot.params['id'];
        if (this.packageId) {
            this.findPackageById();
        } else {
            this.route.navigate(['master/package']);
        }
        this.findPackageItem();
        this.findPackageImages();
    }

    goToPackageMaster() {
        this.route.navigate(['master/package']);
    }

    resetPackageItemList() {
        this.masterService.findPackageItem(this.packageId)
            .subscribe(res => {
                this.droppedItems = res;
                this.filterItem();
            });
    }

    findPackageItem() {
        this.masterService.findPackageItem(this.packageId)
            .subscribe(res => {
                this.droppedItems = res;
            });
    }

    findPackageById() {
        this.masterService.findPackageById(this.packageId)
            .subscribe(res => {
                this.packageById = res;
                this.getPackageMarkup();
                this.getPackageSalesTax();
                this.getPackageTotal();
            });
    }

    findItemByCategory() {
        this.masterService.findItemByCategory(this.selectedCategoryId)
            .subscribe(res => {
                this.items = res;
                this.filterItem();
            });
    }

    getImage(image) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(image);
    }

    filterItem() {
        this.notDroppedItems = [];
        this.items.forEach(item => {
            let dropped = false;
            this.droppedItems.forEach(i => {
                if (i.id == item.id) {
                    dropped = true;
                }
            });
            if (!dropped) {
                this.notDroppedItems.push(item);
            }
        });
    }

    removeFromDropped(item) {
        let tempItems = [];
        this.droppedItems.forEach(i => {
            if (i.id != item.id) {
                tempItems.push(i);
            }
        });
        this.droppedItems = tempItems;
    }

    removeFromItems(item) {
        let tempItems = [];
        this.notDroppedItems.forEach(i => {
            if (i.id != item.id) {
                tempItems.push(i);
            }
        });
        this.notDroppedItems = tempItems;
    }

    onItemDrop(e: any) {
        let exists = false;
        this.droppedItems.forEach(item => {
            if (e.dragData.id == item.id) {
                exists = true;
            }
        });

        if (!exists) {
            this.droppedItems.push(e.dragData);
        }

        this.removeFromItems(e.dragData);
    }

    onItemDropBack(e: any) {
        let exists = false;
        this.notDroppedItems.forEach(item => {
            if (e.dragData.id == item.id) {
                exists = true;
            }
        });

        if (!exists) {
            this.notDroppedItems.push(e.dragData);
        }

        this.removeFromDropped(e.dragData);
    }

    getPackageSalesTax() {
        let costWithMarkup: number = this.packageMarkup + +this.packageById.cost;
        this.packageTax = (costWithMarkup * this.packageById.taxRate) / 100;
    }

    getPackageMarkup() {
        this.packageMarkup = (this.packageById.cost * this.packageById.markup) / 100;
    }

    getPackageTotal() {
        let cost: number = this.packageById.cost;
        this.packageTotal = parseFloat(cost.toString()) + parseFloat(this.packageTax.toString()) + parseFloat(this.packageMarkup.toString());
    }

    savePackageItem() {
        this.packageById.packageItems = this.droppedItems;
        this.packageById.createdBy = this.store.getData(AUTH.username);
        this.masterService.savePackageItem(this.packageById)
            .subscribe(res => {
                swal({
                    type: "success",
                    title: "Success!",
                    text: "Package item list has been updated!",
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success"
                });
            });
    }

    viewImage(id) {
        this.enquiryService.findImage(id)
            .subscribe(res => {
                this.selectedImg = res.image;
                var modal = document.getElementById('myModal');

                modal.style.display = "block";

                var closebtn = document.getElementById("close-btn");
                closebtn.onclick = function () {
                    modal.style.display = "none";
                };
            });
    }

}
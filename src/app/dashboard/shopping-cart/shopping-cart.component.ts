import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {MasterService} from "../../services/master/MasterService";
import {WalkThroughService} from "../../services/enquiry/WalkThroughService";
import {DomSanitizer} from "@angular/platform-browser";
import {PackageItemService} from "../../util/package-item/PackageItemService";
import {ChangeWTemplateComponent} from "../enquiry/change-walkthrough/change-w-template.component";
import {CartPopupComponent} from "./cart-popup/cart-popup.component";
import {DialogService} from "ng2-bootstrap-modal";
import {NotificationUtils} from "../../util/NotificationUtil";
import {EnquiryService} from "../../services/enquiry/EnquiryService";
import {Store} from "../../util/Store";
import {AUTH} from "../../util/Constants";
import {Router} from "@angular/router";

declare var require: any;
declare var $: any;

@Component({
    selector: 'shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['shopping-cart.component.css']
})
export class ShoppingCartComponent extends OnInit implements AfterViewInit {
    @Input("fkWalkThroughId") fkWalkThroughId: number;

    private categories = [];
    private loading: boolean = false;

    private viewPackageMode: boolean = false;
    private viewCartItemMode: boolean = false;

    private viewPackage: any;
    private packageItems: any;
    private image: any;

    private images: any;
    private selectedImg: any;

    private searchCart = {
        search: null,
        fkItemCategory: null,
        from: 0,
        to: 10000,
        offset: 0
    };
    private stores: any;

    private cartStores: any;

    // pagination
    private pageNumbers: any = [];
    private pageSize: number = 6;
    private currentPageNumber: number = 1;

    private subTotal: number = 0;
    private tax: number = 0;
    private total: number = 0;

    constructor(private _sanitizer: DomSanitizer,
                private masterService: MasterService,
                private dialogService: DialogService,
                private walkThroughService: WalkThroughService,
                private notify: NotificationUtils,
                private store: Store,
                private route: Router,
                private packageItemService: PackageItemService,
                private enquiryService: EnquiryService) {
        super();
        this.findActiveCategory();
        this.findPackages();
    }

    findPackages() {
        this.loading = true;
        this.walkThroughService.findPackagesCount(this.searchCart)
            .subscribe(res => {
                this.createPaginationBar(res);

                this.walkThroughService.findPackages(this.searchCart)
                    .subscribe(res => {
                        res.forEach(r => {
                            r.totalCost = this.calculateValues(r);
                        });
                        this.stores = res;
                        this.loading = false;
                    });
            });

    }

    findPackageImages(id) {
        this.masterService.findPackageImages(id)
            .subscribe(res => {
                this.images = res;
            });
    }

    createPaginationBar(numberOfItems) {
        this.pageNumbers = [];
        for (let i = 0; i < numberOfItems / this.pageSize; i++) {
            this.pageNumbers.push(i + 1);
        }
    }

    changePageNumber(pageNumber) {
        this.currentPageNumber = pageNumber;
        this.searchCart.offset = this.pageSize * pageNumber - this.pageSize;
        this.findPackages();
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

    getImage(image) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(image);
    }

    calculateValues(packageItem) {
        return this.packageItemService.calculateValues(packageItem.cost, packageItem.taxRate, packageItem.markup);
    }

    onItemDrop(e) {
        this.addToCart(e.dragData);
    }

    addToCart(item) {

        this.dialogService.addDialog(CartPopupComponent, {
            packageData: item,
            fkWalkThrough: this.fkWalkThroughId
        }).subscribe((dataSet) => {
            if (dataSet) {
                dataSet.fkWalkThrough = this.fkWalkThroughId;

                if (dataSet.updateMode == true) {
                    this.walkThroughService.updatePackageToCart(dataSet)
                        .subscribe(res => {
                            this.findCartSummeryDetail();
                            this.notify.success('Shopping cart has been updated!');
                        });
                } else {
                    this.walkThroughService.addPackageToCart(dataSet)
                        .subscribe(res => {
                            this.findCartSummeryDetail();
                            this.notify.success('Shopping cart has been updated!');
                        });
                }
            }
        });
    }

    findCartSummeryDetail() {
        this.walkThroughService.findCartSummeryDetail(this.fkWalkThroughId)
            .subscribe(res => {
                this.total = res.total;
                this.subTotal = res.subTotal;
                this.tax = res.tax;
            });
    }

    ngOnInit(): void {
        let noUiSlider = require('nouislider');
        let sliderDouble: any = document.getElementById('sliderDouble');
        noUiSlider.create(sliderDouble, {
            start: [0, 10000],
            connect: true, step: 100,
            range: {
                min: 0,
                max: 10000
            }
        });

        let that = this;
        sliderDouble.noUiSlider.on('update', function (values, handle) {
            that.searchCart.from = values[0];
            that.searchCart.to = values[1];
        });
        sliderDouble.noUiSlider.on('end', function () {
            that.currentPageNumber = 1;
            that.findPackages();
        });
    }

    ngAfterViewInit(): void {
        this.findCartSummeryDetail();
    }

    viewMore(stockItem) {
        this.viewPackage = stockItem;
        this.masterService.findPackageItem(stockItem.id)
            .subscribe(res => {
                this.packageItems = res;
            });
        this.findPackageImages(stockItem.id);

        if (this.viewPackage.fkDocument) {
            this.viewImage(this.viewPackage.fkDocument);
        }

        this.viewCartItemMode = false;
        this.viewPackageMode = true;
    }

    goToShoppingCart() {
        this.viewPackage = null;
        this.viewPackageMode = false;
    }

    viewImage(id) {
        this.enquiryService.findImage(id)
            .subscribe(res => {
                this.image = {
                    image: this._sanitizer.bypassSecurityTrustResourceUrl(res.image)
                };
            });
    }

    viewCartItem() {
        this.viewCartItemMode = true;
    }

    bookNow() {
        this.route.navigate(['enquiry/book-now/' + this.fkWalkThroughId]);
    }


    viewImageFull(id) {
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

    getImageBase64(image) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(image);
    }
}
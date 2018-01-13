import {Injectable} from "@angular/core";

declare var $: any;

@Injectable()
export class PackageItemService {
    private cost: number;
    private taxRate: number;
    private markup: number;

    private packageMarkup: number = 0;
    private packageTotal: number = 0;
    private packageTax: number = 0;

    public calculateValues(cost: number, taxRate: number, markup: number) {
        this.cost = cost;
        this.taxRate = taxRate;
        this.markup = markup;

        if (this.cost) {
            this.getPackageMarkup();
            this.getPackageSalesTax();
            this.getPackageTotal();
        }
        return this.packageTotal;
    }

    private getPackageSalesTax() {
        let costWithMarkup: number = this.packageMarkup + +this.cost;
        this.packageTax = (costWithMarkup * this.taxRate) / 100;
    }

    private getPackageMarkup() {
        this.packageMarkup = (this.cost * this.markup) / 100;
    }

    private getPackageTotal() {
        let cost: number = this.cost;
        this.packageTotal = parseFloat(cost.toString()) + parseFloat(this.packageTax.toString()) + parseFloat(this.packageMarkup.toString());
    }
}
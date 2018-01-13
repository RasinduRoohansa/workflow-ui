import {Component, Input} from "@angular/core";

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html'
})
export class LoadingComponent {

    private _wLoading:number;

    @Input()
    get wLoading(): number {
        return this._wLoading;
    }

    set wLoading(value: number) {
        this._wLoading = value;
    }
}
import {Injectable} from "@angular/core";

@Injectable()
export class SharedService {
    private _adminTool = false;


    get adminTool(): boolean {
        return this._adminTool;
    }

    set adminTool(value: boolean) {
        this._adminTool = value;
    }
}
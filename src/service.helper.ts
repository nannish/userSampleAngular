import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
 
import { Observable } from "rxjs";
// import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ServiceHelper {
    constructor() { }
    public extractArrayData(res: Response) {
        let body = res;
        // this.spinner.hide();
        return body || [];
    }
    public extractData(res: Response) {
        let body = res;
        // this.spinner.hide();
        if (body != null && body != undefined)
            return body
        else
            return {};
    }
    public handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body['error'] || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);

        return Observable.throw(errMsg);
    }
}
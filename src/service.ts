import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { ServiceHelper } from './service.helper';
 

const apiEnPoint = 'https://localhost:44379/api/user/';
@Injectable()
export class UserService {

    constructor(private http: HttpClient, private serviceHelper: ServiceHelper) {
    }

    AddUser(user) {
      
        return this.http.post(apiEnPoint + 'AddUser', user).pipe(
            map(this.serviceHelper.extractArrayData), catchError(this.serviceHelper.handleError));
    }

    EditUser(user) {
          debugger;
        return this.http.post(apiEnPoint + 'EditUser', user).pipe(
            map(this.serviceHelper.extractArrayData), catchError(this.serviceHelper.handleError));
    }

    DeleteUser(id) {
        // let params = new HttpParams();
        // params = params.append('id', id);
        return this.http.delete(apiEnPoint + 'Delete?id='+id).pipe(
            map(this.serviceHelper.extractArrayData), catchError(this.serviceHelper.handleError));
    }

    
    GetAllUsers() {
        return this.http.get(apiEnPoint + 'GetUsers').pipe(
            map(this.serviceHelper.extractArrayData), catchError(this.serviceHelper.handleError));
    }

}

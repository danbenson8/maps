import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class StateService {

    constructor(private http: HttpClient) { }

    baseUrl: string = 'http://localhost:3000/'
    currentUrl: string;

    getPaths(state: string): Observable<object> {
        this.currentUrl = this.baseUrl + state;
        return this.http.get(this.currentUrl);
    }

}

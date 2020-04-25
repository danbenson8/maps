import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'


@Injectable({
    providedIn: 'root'
})
export class MapService {

    constructor(private http: HttpClient) { }

    dbUrl: string = 'http://localhost:3000/';
    stateUrl: string;

    getStatePaths(state: string) {
        this.stateUrl = this.dbUrl + state;
        return this.http.get(this.stateUrl);
    }

}

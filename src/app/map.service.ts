import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'


@Injectable({
    providedIn: 'root'
})
export class MapService {

    constructor(private http: HttpClient) { }

    baseUrl: string = 'http://localhost:3000/'
    currentStateUrl: string;

    getStatePaths(state: string) {
        this.currentStateUrl = this.baseUrl + state;
        return this.http.get(this.currentStateUrl);
    }

}

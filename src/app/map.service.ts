import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'


@Injectable({
    providedIn: 'root'
})
export class MapService {

    dbUrl: string = 'http://localhost:3000/db'

    constructor(private http: HttpClient) { }

    getAllStates() {
        return this.http.get(this.dbUrl);
    }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { MapService } from './map.service';

@Injectable({
    providedIn: 'root'
})
export class StateService {

    constructor(private http: HttpClient, private mapService: MapService) { }

    baseUrl: string = 'http://localhost:3000/'
    currentUrl: string;
    selectedStates: object;

    getPaths(state: string): Observable<object> {
        this.currentUrl = this.baseUrl + state;
        return this.http.get(this.currentUrl);
    }

    setSelected(state: string) {
        this.selectedStates[state] = true;
    }

}

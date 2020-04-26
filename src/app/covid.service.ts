import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CovidService {

    requestOptions: object = {
        method: 'GET',
        redirect: 'follow'
    };

    baseUrl: string = 'https://covidtracking.com/api/';
    currentUrl: string;
    historicalUrl: string;


    constructor(private http: HttpClient) { }

    getHistorical() {
        this.historicalUrl = this.baseUrl + 'states/daily'
        return this.http.get(this.historicalUrl, this.requestOptions);
    }

    getCurrent() {
        this.currentUrl = this.baseUrl + 'states'
        return this.http.get(this.currentUrl, this.requestOptions);
    }

}

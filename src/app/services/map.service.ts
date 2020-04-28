import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { LoggerService } from './logger.service';
import { CovidService } from './covid.service';
import { State } from '../classes/State';
import { ApiData } from '../classes/apiData';
import { ColorService } from './color.service';

@Injectable({
    providedIn: 'root'
})
export class MapService {

    dbUrl: string = 'http://localhost:3000/db';
    states: Map<string, State> = new Map();

    constructor(private http: HttpClient,
        private logger: LoggerService,
        private covid: CovidService,
        private color: ColorService) {
        this.setLocalData();
    }

    getLocalData() {
        return this.http.get(this.dbUrl);
    }

    setLocalData() {
        this.getLocalData().subscribe(
            payload => {
                let data: object;
                Object.keys(payload).forEach(el => {
                    data = payload[el];
                    this.states.set(data[0], new State(el, data[0], data[1]['squareSVG'], data[1]['cssPolygons']));
                })
            },
            error => {
                this.logger.log('error', error);
            },
            () => this.setCOVID('now')
        );
    }

    setCOVID(timeFrame: string | string[]): void {
        if (timeFrame == 'now') {
            this.covid.getCurrent().subscribe(
                payload => {
                    Object.values(payload).forEach((state: object) => {
                        try {
                            let statePayload: ApiData = new ApiData(...Object.values(state));
                            let cur: State = this.states.get(state['state'])
                            cur.data = statePayload;
                            this.updateState(state['state'], cur);
                        } catch (error) {
                            this.logger.log('ignore', error, `state: ${state['state']} not available`);
                        }
                    });
                },
                error => {
                    this.logger.log('error', error, "couldn't reach api :(")
                },
                () => this.status()
            );
        }
    }

    updateState(state: string, info: State, logError: boolean = false): boolean {
        try {
            this.states.set(state, info);
            return true;
        } catch (error) {
            if (logError) {
                this.logger.log('error', error, `error updating state: ${state} w/ info: ${info}`)
            }
            return false;
        }
    }

    status(status: string = 'recovered'): void {
        let valueByState: object = {};
        let colorByState: object = {};
        for (const [key, value] of this.states) {
            if (key) {
                valueByState[key] = value.data[status];
            }
        }
        colorByState = this.color.proportionOfTotal(valueByState, status);
        Object.keys(colorByState).forEach(key => this.states.get(key).style['background-color'] = colorByState[key]);
    }

    getData(): Observable<Map<string, State>> {
        return of(this.states);
    }
}

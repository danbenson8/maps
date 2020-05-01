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
    historical: Map<string, Map<string, ApiData>> = new Map();
    historicalRequested: boolean = false;
    viewStatus: string = 'positive';

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
            () => {
                this.setCOVID('now');
                this.setCOVID('historical');
            }
        );
    }

    setCOVID(timeFrame: string | string[], override?: boolean): void {
        if (timeFrame == 'now') {
            this.covid.getCurrent().subscribe(
                payload => {
                    Object.values(payload).forEach((state: object) => {
                        try {
                            let statePayload: ApiData = new ApiData(state);
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
        } else if (timeFrame == 'historical' && !this.historicalRequested && !override) {
            this.historicalRequested = true;
            this.covid.getHistorical().subscribe(
                payload => {
                    let dateMap: Map<string, ApiData> = new Map();
                    let currentDate: string;
                    Object.values(payload).forEach((entry: object) => {
                        try {
                            let date: string = entry['date'].toString();
                            let stateName: string = entry['state'];
                            delete entry['date'];
                            if (currentDate) {
                                if (date == currentDate) {
                                    dateMap.set(stateName, new ApiData(entry));
                                } else {
                                    currentDate = date;
                                    this.historical.set(currentDate, dateMap);
                                    dateMap = new Map();
                                }
                            } else {
                                currentDate = date;
                                dateMap.set(stateName, new ApiData(entry));
                            }
                        } catch (error) {
                            console.log(error);
                            //this.logger.log('ignore', error, `state: ${state['state']} not available`);
                        }
                    });
                },
                error => {
                    console.log(error);
                },
                () => {
                    //console.log(this.historical);
                }
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

    status(): void {
        let valueByState: object = {};
        let colorByState: object = {};
        for (const [key, value] of this.states) {
            try {
                valueByState[key] = value.data[this.viewStatus];
            } catch (error) {
                valueByState[key] = 0;
            }
        }
        colorByState = this.color.proportionOfTotal(valueByState, this.viewStatus);
        Object.keys(colorByState).forEach(key => this.states.get(key).style['background-color'] = colorByState[key]);
    }

    getData(): Observable<Map<string, State>> {
        return of(this.states);
    }

    changeDate(date: string): void {
        let newInfo: State;
        for (const [key, value] of this.states) {
            try {
                newInfo = new State(value.name,
                    value.initial,
                    value.svgPath,
                    value.cssPolygons,
                    value.selected,
                    value.style,
                    this.historical.get(date).get(key));
                this.updateState(key, newInfo);
            } catch (error) {
                console.log(error);
            }
        }
        this.status();
    }
}

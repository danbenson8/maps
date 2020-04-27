import { Component, OnInit, HostListener, Input } from '@angular/core';
import { MapService } from '../map.service';
import { CovidService } from '../covid.service';
import { LoggerService } from '../logger.service';

class apiData {
    constructor(
        private state?: string,
        private positive?: number,
        private positiveScore?: number,
        private negativeScore?: number,
        private negativeRegularScore?: number,
        private commercialScore?: number,
        private grade?: string,
        private score?: number,
        private notes?: string,
        private dataQualityGrade?: string,
        private negative?: number,
        private pending?: any,
        private hospitalizedCurrently?: number,
        private hospitalizedCumulative?: any,
        private inIcuCurrently?: any,
        private inIcuCumulative?: any,
        private onVentilatorCurrently?: any,
        private onVentilatorCumulative?: any,
        private recovered?: number,
        private lastUpdateEt?: string,
        private checkTimeEt?: string,
        private death?: number,
        private hospitalized?: any,
        private total?: number,
        private totalTestResults?: number,
        private posNeg?: number,
        private fips?: string,
        private dateModified?: string,
        private dateChecked?: string,
        private hash?: string,
    ) { }
}
class State {
    constructor(
        private name: string,
        private selected: boolean = false,
        // TODO convert to map... datE -> datA
        private data?: apiData,
    ) { }
}
@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    states = new Map();

    constructor(private mapService: MapService,
        private covidService: CovidService,
        private logger: LoggerService) { }

    ngOnInit() {
        this.getAllStates();
    }

    getAllStates() {
        this.mapService.getAllStates().subscribe(
            payload => {
                Object.keys(payload).forEach(el => {
                    this.states.set(payload[el][0], new State(el));
                })
            },
            error => {
                this.logger.log('error', error)
            },
            () => this.getCOVID('now'));
    }

    getCOVID(timeFrame: string | string[]): void {
        if (timeFrame == 'now') {
            this.covidService.getCurrent().subscribe(
                payload => {
                    Object.values(payload).forEach((state: object) => {
                        let stateName: string;
                        let statePayload: apiData;
                        try {
                            stateName = this.states.get(state['state']).name;
                        } catch (error) {
                            this.logger.log('ignore', error, `state: ${state['state']} not available`);
                        }
                        if (stateName) {
                            statePayload = new apiData(...Object.values(state));
                            this.updateState(state['state'], new State(stateName, false, statePayload));
                        }
                    });
                },
                error => {
                    this.logger.log('error', error, "couldn't reach api :(")
                },
                () => this.displayCOVID('now')
            );
        }
    }

    updateState(state: string, info: any, logError: boolean = false): boolean {
        try {
            this.states.set(state['state'], info);
            return true;
        } catch (error) {
            if (logError) {
                this.logger.log('error', error, `error updating state: ${state} w/ info: ${info}`)
            }
            return false;
        }
    }

    select(event: MouseEvent) {
        let state = event.target['title'];
        if (this.states.has(state)) { this.states.get(state).selected = !this.states.get(state).selected; }
    }

    displayCOVID(timeFrame: string | string[], status?: string): void {
        let color: string;
        switch (status) {
            case 'positive': {
                color = 'var(--bright-yellow)';
                break;
            }
            case 'negative': {
                color = 'var(--electron-blue)';
                break;
            }
            case 'recovered': {
                color = 'var(--mint-leaf)';
                break;
            }
            case 'death': {
                color = 'var(--chi-gong)';
                break;
            }
            default: {
                color = 'var(--chi-gong)';
                break;
            }

        }

        if (timeFrame == 'now') {
            console.log(color);
        }

    }
}

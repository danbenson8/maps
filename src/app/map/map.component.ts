import { Component, OnInit, HostListener, Input } from '@angular/core';
import { MapService } from '../map.service';
import { CovidService } from '../covid.service';

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

    constructor(private mapService: MapService, private covidService: CovidService) { }

    ngOnInit() {
        // TODO move error handling to a logger
        this.mapService.getAllStates().subscribe(
            payload => {
                Object.keys(payload).forEach(el => {
                    this.states.set(payload[el][0], new State(el));
                })
            },
            error => {
                alert("couldn't get map data! :(");
                console.log(`mapService error: ${error}`)
            },
            () => this.getCOVID('now'));
    }

    getCOVID(timeFrame: string | string[]): void {
        if (timeFrame == 'now') {
            this.covidService.getCurrent().subscribe(
                payload => {
                    Object.values(payload).forEach((state: object) => {
                        try {
                            let stateName: string = this.states.get(state['state']).name;
                            let statePayload = new apiData(...Object.values(state));
                            this.updateState(state['state'], new State(stateName, false, statePayload))
                        } catch (error) {
                            this.logger(`catch error: ${error}`, this.getCOVID)
                        }
                    });
                },
                error => {
                    alert("couldn't get state COVID data! :(");
                    console.log(`covideService error: ${error}`)
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
                this.logger(`error updating state: ${state} w/ info: ${info}`, this.updateState, [state])
            }
            return false;
        }
    }

    logger(message: string, where: Function, parameters?: any[]) {
        // TODO add a message log
        console.log(`${where.name}${(parameters) ? ` w/ parameters: ${parameters}` : ''}: ${message}`);
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

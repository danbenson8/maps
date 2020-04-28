import { Component, OnInit, HostListener, Input } from '@angular/core';
import { MapService } from '../services/map.service';
import { CovidService } from '../services/covid.service';
import { LoggerService } from '../services/logger.service';
import { ColorService } from '../services/color.service';
import { ApiData } from '../classes/apiData';
import { State } from '../classes/State';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    states: Map<any, State> = new Map();
    loaded: Promise<boolean>;

    constructor(
        private mapService: MapService,
        private covidService: CovidService,
        private logger: LoggerService,
        private color: ColorService) { }

    ngOnInit() {
        this.getAllStates();
    }

    getAllStates() {
        this.mapService.getAllStates().subscribe(
            payload => {
                let data: object;
                Object.keys(payload).forEach(el => {
                    data = payload[el];
                    this.states.set(data[0], new State(el, data[0], data[1]['squareSVG'], data[1]['cssPolygons']));
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
                () => this.displayCOVID('now')
            );
        }
    }

    updateState(state: string, info: any, logError: boolean = false): boolean {
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

    select(event: MouseEvent) {
        let state = event.target['title'];
        console.log(state);
        if (this.states.has(state)) {
            this.states.get(state).selected = !this.states.get(state).selected;
            console.log('here');
        }
    }

    displayCOVID(timeFrame: string | string[], status: string = 'recovered'): void {
        this.loaded = Promise.resolve(true);
        let valueByState: object = {};
        let colorByState: object = {};
        if (timeFrame = 'now') {
            for (const [key, value] of this.states) {
                if (key) {
                    valueByState[key] = value.data[status];
                }
            }
            colorByState = this.color.proportionOfTotal(valueByState, status);
            Object.keys(colorByState).forEach(key => this.states.get(key).style['background-color'] = colorByState[key]);
        }
    }
}

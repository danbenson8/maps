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

    states = new Map();

    constructor(private mapService: MapService,
        private covidService: CovidService,
        private logger: LoggerService,
        private color: ColorService) { }

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
            () => this.displayCOVID('now'));
    }

    getCOVID(timeFrame: string | string[]): void {
        if (timeFrame == 'now') {
            this.covidService.getCurrent().subscribe(
                payload => {
                    Object.values(payload).forEach((state: object) => {
                        let stateName: string;
                        let statePayload: ApiData;
                        try {
                            stateName = this.states.get(state['state']).name;
                        } catch (error) {
                            this.logger.log('ignore', error, `state: ${state['state']} not available`);
                        }
                        if (stateName) {
                            statePayload = new ApiData(...Object.values(state));
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
        this.color.proportionOfTotal({ 'AK': 100, 'HI': 12, 'CT': 42 }, 'recovered');
    }
}

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
            () => {
                this.covidService.getCurrent().subscribe(
                    payload => {
                        Object.values(payload).forEach((state: object) => {
                            try {
                                let stateName: string = this.states.get(state['state']).name;
                                let statePayload = new apiData(...Object.values(state));
                                this.states.set(state['state'], new State(stateName, false, statePayload));
                            } catch (error) {
                                // TODO move this to a logger
                                console.log(`catch error: ${error}`, state['state']);
                            }
                        });
                    },
                    error => {
                        alert("couldn't get state COVID data! :(");
                        console.log(`covideService error: ${error}`)
                    },
                    () => console.log(this.states)
                );
            });
    }

    select(event: MouseEvent) {
        let state = event.target['title'];
        if (this.states.has(state)) { this.states.get(state).selected = !this.states.get(state).selected; }
    }
}

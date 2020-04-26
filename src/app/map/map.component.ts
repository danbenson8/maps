import { Component, OnInit, HostListener, Input } from '@angular/core';
import { MapService } from '../map.service';
import { CovidService } from '../covid.service';

class Data {
    date: string;
    positive: number;
    negative: number;
    recovered: number;
    death: number;
}
class State {
    name: string;
    selected: boolean;
    data: Data[];
    constructor(name: string) {
        this.name = name;
        this.selected = false;
    }
    [Symbol.iterator]() {

    }
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
        // TODO error handling
        this.mapService.getAllStates()
            .subscribe(data => {
                Object.keys(data).forEach(el => {
                    this.states.set(data[el][0], new State(el));
                });
            });
    }

    select(event: MouseEvent) {
        let state = event.target['title'];
        if (this.states.has(state)) { this.states.get(state).selected = !this.states.get(state).selected; }
        console.log(this.states)
    }
}

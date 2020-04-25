import { Component, OnInit, HostListener, Input } from '@angular/core';
import { MapService } from '../map.service';

class State {
    id: string;
    selected: boolean;
    constructor(id: string) {
        this.id = id;
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

    newStates = new Map();

    constructor(private mapService: MapService) { }

    ngOnInit() {
        // TODO error handling
        this.mapService.getAllStates()
            .subscribe(data => {
                Object.keys(data).forEach(el => {
                    this.newStates.set(el, new State(data[el][0]));
                });
            });
    }

    select(event: MouseEvent) {
        let state = event.target['title'];
        if (this.newStates.has(state)) { this.newStates.get(state).selected = !this.newStates.get(state).selected; }
    }
}

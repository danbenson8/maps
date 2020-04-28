import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { State } from '../classes/State';
import { LoggerService } from '../services/logger.service';

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
        private logger: LoggerService) { }

    ngOnInit() {
        this.mapService.getData().subscribe(
            res => this.states = res,
            err => console.log(err),
            () => this.loaded = Promise.resolve(true)
        );
    }

    select(event: MouseEvent) {
        let state = event.target['title'];
        console.log(state);
        if (this.states.has(state)) {
            this.states.get(state).selected = !this.states.get(state).selected;
            console.log('here');
        }
    }

}

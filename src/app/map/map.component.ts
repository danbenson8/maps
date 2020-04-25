import { Component, OnInit, HostListener, Input } from '@angular/core';
import { MapService } from '../map.service';

class state {
    constructor(private name: string) {

    }
}
@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    states: state[] = [];

    constructor(private mapService: MapService) { }

    ngOnInit() {
        // TODO error handling
        this.mapService.getAllStates()
            .subscribe(data => this.states = Object.keys(data).map(el => new state(el)));
    }
}

import { Component, OnInit, HostListener, Input } from '@angular/core';
import { MapService } from '../map.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    states: string[] = [];

    constructor(private mapService: MapService) { }

    ngOnInit() {
        // TODO error handling
        this.mapService.getAllStates()
            .subscribe(data => this.states = Object.keys(data));
    }

}

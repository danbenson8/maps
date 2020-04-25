import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';

@Component({
    selector: 'app-state',
    templateUrl: './state.component.html',
    styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

    name: string = 'alaska';
    initial: string;
    squareSVG: string;
    cssPolygons: string[];

    constructor(private stateService: StateService) { }

    ngOnInit() {
        this.stateService.getPaths(this.name)
            .subscribe(data => {
                this.initial = data[0];
                this.squareSVG = data[1]['squareSVG'];
                this.cssPolygons = data[1]['cssPolygons'];
            });
    }

}

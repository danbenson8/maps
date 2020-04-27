import { Component, OnInit, Input, Output } from '@angular/core';
import { State } from '../classes/State'

@Component({
    selector: 'app-state',
    templateUrl: './state.component.html',
    styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

    @Input() STATE: State;

    initial: string;
    squareSVG: string;
    cssPolygons: string[];
    style: object;

    constructor() { }

    ngOnInit() {
        this.initial = this.STATE.initial;
        this.squareSVG = this.STATE.svgPath;
        this.cssPolygons = this.STATE.cssPolygons.map(el => `polygon(${el})`);
        this.style = this.STATE.style;
    }
}

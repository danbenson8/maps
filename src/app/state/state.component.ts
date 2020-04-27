import { Component, OnInit, Input, Output } from '@angular/core';
import { StateService } from '../services/state.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-state',
    templateUrl: './state.component.html',
    styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

    @Input() name: string;
    initial: string;
    squareSVG: string;
    cssPolygons: string[];

    highlighted: boolean = false;
    stateStyle: object = {
        'background-color': 'var(--city-lights)',
        'transform': 'scale(1)',
    }

    constructor(private stateService: StateService) { }

    ngOnInit() {
        // TODO errorhandling
        this.stateService.getPaths(this.name)
            .subscribe(data => {
                this.initial = data[0];
                this.squareSVG = data[1]['squareSVG'];
                this.cssPolygons = data[1]['cssPolygons'].map(el => `polygon(${el})`
                );
            });
    }

    select(): void {
        this.highlighted = !this.highlighted;
        this.stateStyle['background-color'] = (this.highlighted) ? 'var(--electron-blue)' : 'var(--city-lights)';
    }
}

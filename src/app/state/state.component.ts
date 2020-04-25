import { Component, OnInit, Input } from '@angular/core';
import { StateService } from '../state.service';

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

    selected: boolean = false;
    stateStyle: object = {
        'background-color': 'white',
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
        this.selected = (this.selected) ? false : true;
        this.toggleHighlight();
    }

    toggleHighlight(): void {
        this.stateStyle['background-color'] = (this.selected) ? 'blue' : 'white';
    }

}

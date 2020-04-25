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

    stateStyle: any = {
        'background-color': 'orange'
    }

    _polygon: string = 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)';
    color: string = 'white';

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

}

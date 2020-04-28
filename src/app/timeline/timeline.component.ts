import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

    numbers: string[] = Array.from({ length: 100 }).map((_, i) => `Item #${i}`);

    constructor(private mapService: MapService) { }

    ngOnInit() {
    }

}

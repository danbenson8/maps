import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

    date: Date = new Date('2019-01-23');
    addDays(date, days) {
        const copy = new Date(Number(date))
        copy.setDate(date.getDate() + days)
        return copy
    }
    numbers: Date[] = Array.from({ length: 100 }).map((_, i) => this.addDays(this.date, i));

    constructor(private mapService: MapService) { }

    ngOnInit() {
    }

}

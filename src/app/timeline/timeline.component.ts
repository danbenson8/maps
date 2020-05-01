import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MapService } from '../services/map.service';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

    invert = true;
    max: number;
    min: number = 0;
    showTicks = true;
    step = 1;
    vertical = true;

    @Output() viewDate = new EventEmitter<Date>();
    dateRange: Date[];
    firstCase: Date = new Date('2020-01-22, 00:00:00 -0500');
    today: Date = new Date();

    constructor(private mapService: MapService) { }

    ngOnInit() {
        this.initDates();
    }

    initDates() {
        // TODO improve robustness
        let daysSinceFirstCase = Math.floor((this.today.getTime() - this.firstCase.getTime()) / 86400000);
        this.max = daysSinceFirstCase - 1;
        this.dateRange = Array.from({ length: daysSinceFirstCase }).map((_, i) => this.addDays(this.firstCase, i));
    }

    addDays(date, days) {
        const copy = new Date(Number(date))
        copy.setDate(date.getDate() + days)
        return copy
    }

    setDate(event) {
        let day = this.dateRange[event.value];
        this.viewDate.emit(day);
    }

}

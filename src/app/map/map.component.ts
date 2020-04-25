import { Component, OnInit, HostListener, Input } from '@angular/core';
import { MapService } from '../map.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    states: string[] = [];

    scaleValue: number = 1;
    translateValueX: number = 0;
    translateValueY: number = 0;
    dragDisabled: boolean = true;
    interactStyle: object = {
        'transform': this.matrix(),
        'transform-origin': 'center',
        'cursor': 'initial',
    }

    matrix() {
        return `matrix(${this.scaleValue}, 0, 0, ${this.scaleValue}, ${this.translateValueX}, ${this.translateValueY})`
    }

    @HostListener('document:keydown', ['$event'])
    ctrlDown(event: KeyboardEvent) {
        if (event.key == 'Control') {
            this.dragDisabled = false;
            this.interactStyle['cursor'] = 'move';
        }
    }
    @HostListener('document:keyup', ['$event'])
    ctrlUp(event: KeyboardEvent) {
        if (event.key == 'Control') {
            this.dragDisabled = true;
            this.interactStyle['cursor'] = 'default';
        };
    }

    wheel(event: WheelEvent) {
        if (!event.ctrlKey && !event.shiftKey) {
            event.preventDefault();
            this.scaleValue += (event.deltaY < 0) ? 0.05 : -0.05;
        }
        if (event.shiftKey) {
            this.translateValueX += (event.deltaY < 0) ? 20 : -20;
        }
        if (event.ctrlKey) {
            event.preventDefault();
            this.translateValueY += (event.deltaY < 0) ? 20 : -20;
        }
        this.interactStyle['transform'] = `${this.matrix()}`;
    }

    constructor(private mapService: MapService) { }

    ngOnInit() {
        // TODO error handling
        this.mapService.getAllStates()
            .subscribe(data => this.states = Object.keys(data));
    }

}

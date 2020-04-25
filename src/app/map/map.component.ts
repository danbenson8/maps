import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    scaleValue: number = 1;
    translateValueX: number = 0;
    translateValueY: number = 0;
    dragDisabled: boolean = true;
    colorSelected: string = 'white'
    divStyle: any = {
        'cursor': 'initial',
    }
    mapStyle: any = {
        'transform': this.matrix(),
        'transform-origin': 'center',
        'cursor': 'initial',
    }
    stateStyle: any = {
        'background-color': 'orange'
    }

    matrix() {
        return `matrix(${this.scaleValue}, 0, 0, ${this.scaleValue}, ${this.translateValueX}, ${this.translateValueY})`
    }

    @HostListener('document:keydown', ['$event'])
    ctrlDown(event: KeyboardEvent) {
        if (event.key == 'Control') {
            this.dragDisabled = false;
            this.mapStyle['cursor'] = 'move';
            this.colorSelected = 'orange';
        }
    }
    @HostListener('document:keyup', ['$event'])
    ctrlUp(event: KeyboardEvent) {
        if (event.key == 'Control') {
            this.dragDisabled = true;
            this.mapStyle['cursor'] = 'default';
            this.colorSelected = 'white';
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
        this.mapStyle['transform'] = `${this.matrix()}`;
    }

    constructor() { }

    ngOnInit() {
    }

}

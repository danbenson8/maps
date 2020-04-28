import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MapService } from '../services/map.service';
import { ColorService } from '../services/color.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    @ViewChild('sidenav') sidenav: MatSidenav;
    options: object = {

    }
    datetime: Date = new Date();
    currentColor: string;

    close() {
        this.sidenav.close();
    }

    scroll(event) {
        console.log(event);
    }

    changeStatus(status) {
        this.currentColor = this.color.getTheme(status);
        this.mapService.status(status);
        let sheet = document.createElement('style')
        sheet.innerHTML = `.simplebar-track.simplebar-vertical .simplebar-scrollbar:before {background: var(${this.currentColor});}`;
        document.body.appendChild(sheet);
    }

    constructor(private mapService: MapService, private color: ColorService) {
        this.changeStatus('recovered')
    }

    ngOnInit() {
    }

}

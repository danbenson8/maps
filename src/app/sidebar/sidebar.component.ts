import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MapService } from '../services/map.service';

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

    close() {
        this.sidenav.close();
    }

    changeStatus(status) {
        this.mapService.status(status);
    }

    constructor(private mapService: MapService) { }

    ngOnInit() {
    }

}

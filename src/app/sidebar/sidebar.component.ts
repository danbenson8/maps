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
    datetime: Date;
    currentColor: string;

    constructor(private mapService: MapService, private color: ColorService) {
        this.changeStatus('recovered')
    }

    ngOnInit() {
    }

    close(): void {
        this.sidenav.close();
    }

    changeStatus(status): void {
        this.mapService.viewStatus = status;
        this.mapService.status();

        // TODO change slider color instead
        this.currentColor = this.color.getTheme(status);
        let sheet = document.createElement('style')
        sheet.innerHTML = `.simplebar-track.simplebar-vertical .simplebar-scrollbar:before {background: var(${this.currentColor});}`;
        document.body.appendChild(sheet);
    }

    setDate(day: Date): void {
        let date = this.convertDate(day);

        this.datetime = day;
        this.mapService.setCOVID('historical');
        this.mapService.changeDate(date);

        //console.log(this.mapService.historical.get(date), date);
    }

    convertDate(date: Date): string {
        let day: string = '' + date.getDate();
        let month: string = '' + (date.getMonth() + 1);
        let year: string = '' + date.getFullYear();

        day = (day.length < 2) ? '0' + day : day;
        month = (month.length < 2) ? '0' + month : month;

        return year + month + day
    }

}

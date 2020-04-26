import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { StateComponent } from './state/state.component';
import { MapComponent } from './map/map.component';
import { MapService } from './map.service';
import { StateService } from './state.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SafePipe } from './safe.pipe';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        AppComponent,
        StateComponent,
        MapComponent,
        SafePipe,
        SidebarComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        DragDropModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
    ],
    providers: [
        MapService,
        StateService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }

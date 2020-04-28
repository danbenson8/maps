import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { StateComponent } from './state/state.component';
import { MapComponent } from './map/map.component';
import { MapService } from './services/map.service';
import { StateService } from './services/state.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SafePipe } from './safe.pipe';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoggerService } from './services/logger.service';
import { ColorService } from './services/color.service';
import { TimelineComponent } from './timeline/timeline.component';
import { SimplebarAngularModule } from 'simplebar-angular';

@NgModule({
    declarations: [
        AppComponent,
        StateComponent,
        MapComponent,
        SafePipe,
        SidebarComponent,
        TimelineComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        DragDropModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
        SimplebarAngularModule
    ],
    providers: [
        MapService,
        StateService,
        LoggerService,
        ColorService,
        Map,
        StateComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }

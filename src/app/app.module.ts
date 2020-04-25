import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { StateComponent } from './state/state.component';
import { MapComponent } from './map/map.component';
import { MapService } from './map.service';
import { StateService } from './state.service';

@NgModule({
    declarations: [
        AppComponent,
        StateComponent,
        MapComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [MapService, StateService],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }

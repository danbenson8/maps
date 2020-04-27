import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ColorService {

    constructor() { }
    hex(varName: string): string {
        return getComputedStyle(document.documentElement).getPropertyValue(varName);
    }
}

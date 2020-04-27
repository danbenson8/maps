import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
    providedIn: 'root'
})
export class ColorService {

    constructor(private theme: Map<string, string>, private logger: LoggerService) {
        this.theme.set('positive', '--bright-yellow');
        this.theme.set('negative', '--electron-blue');
        this.theme.set('recovered', '--mint-leaf');
        this.theme.set('death', '--chi-gong');
    }

    hex(varName: string): string {
        return getComputedStyle(document.documentElement).getPropertyValue(varName);
    }

    proportionOfTotal(valueByState: object, type: string): object {
        let ColorByState: object = {};
        let refHex: string;
        let maxValue: number;
        let sum: number = 0;
        try {
            refHex = this.hex(this.theme.get(type));
            // TODO check doing this in arrays isn't faster?
            for (let key in valueByState) {
                let value: number = valueByState[key];
                maxValue = (maxValue > valueByState[key]) ? maxValue : valueByState[key];
                sum += value;
            }
            for (let key in valueByState) {
                let value: number = valueByState[key];
                ColorByState[key] = this.calculateColor(value, maxValue, refHex);
            }

        } catch (error) {
            this.logger.log('error', error, 'ColorService@proportionOfTotal');
        }
        return ColorByState;
    }

    hexToRgb(hex: string): number[] {
        return hex.slice(2).match(/.{2}/g).map(color => parseInt(color, 16))
    }

    rgbToHex(rgb: number[]): string {
        let hex: string[] = rgb.map(el => {
            let h = Math.round(el).toString(16);
            return (h.length) == 1 ? "0" + h : h;
        });
        return `#${hex.join('')}`;
    }

    calculateColor(value: number, refValue: number, refColor: string | number[]): string {
        let prop: number = value / refValue;
        // TODO goes from white to color, want from --city-lights to color
        let rgb = (typeof refColor == 'string') ? this.hexToRgb(refColor).map(el => 255 - el * prop) : refColor.map(el => 255 - el * prop);
        return this.rgbToHex(rgb);
    }
}

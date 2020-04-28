import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
    providedIn: 'root'
})
export class ColorService {

    constructor(private theme: Map<string, string>, private logger: LoggerService) {
        this.theme.set('positive', '--bright-yarrow');
        this.theme.set('negative', '--electron-blue');
        this.theme.set('recovered', '--mint-leaf');
        this.theme.set('death', '--chi-gong');
        this.theme.set('base', '--city-lights')
    }

    getTheme(status: string) {
        return this.theme.get(status);
    }

    hex(varName: string): string {
        return getComputedStyle(document.documentElement).getPropertyValue(varName);
    }

    proportionOfTotal(valueByState: object, type: string): object {
        let ColorByState: object = {};
        let minHex: string;
        let maxHex: string;
        let maxValue: number;
        let minValue: number;
        let sum: number = 0;
        try {
            minHex = this.hex(this.theme.get('base'));
            maxHex = this.hex(this.theme.get(type));
            // TODO check doing this in arrays isn't faster?
            for (let key in valueByState) {
                let value: number = valueByState[key];
                maxValue = (maxValue > valueByState[key]) ? maxValue : valueByState[key];
                minValue = (minValue < valueByState[key]) ? minValue : valueByState[key];
                sum += value;
            }
            for (let key in valueByState) {
                let value: number = valueByState[key];
                ColorByState[key] = this.calculateColor(value, minValue, maxValue, minHex, maxHex);
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

    calculateColor(value: number, minValue: number, maxValue: number, minColor: string | number[], maxColor: string | number[]): string {
        let x: number = (value - minValue) / (maxValue - minValue);
        let minRGB: number[] = (typeof minColor === 'string') ? this.hexToRgb(minColor) : minColor;
        let maxRGB: number[] = (typeof maxColor === 'string') ? this.hexToRgb(maxColor) : maxColor;
        let thisRGB: number[] = [];
        for (let i = 0; i < 3; i++) {
            thisRGB.push((1 - x) * minRGB[i] + x * maxRGB[i]);
        }
        return this.rgbToHex(thisRGB);
    }
}

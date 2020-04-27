import { ApiData } from './apiData';


export class State {
    constructor(
        public name: string,
        public initial: string,
        public svgPath: string,
        public cssPolygons: string[],
        public selected: boolean = false,
        public style: object = {
            'background-color': 'var(--city-lights)',
            'transform': 'scale(1)',
        },
        // TODO convert to map... datE -> datA
        public data?: ApiData,
    ) { }
}

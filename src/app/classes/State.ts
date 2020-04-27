import { ApiData } from './apiData';

export class State {
    constructor(
        public name: string,
        public selected: boolean = false,
        // TODO convert to map... datE -> datA
        public data?: ApiData,
    ) { }
}

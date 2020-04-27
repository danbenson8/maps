import { ApiData } from './apiData';

export class State {
    constructor(
        private name: string,
        private selected: boolean = false,
        // TODO convert to map... datE -> datA
        private data?: ApiData,
    ) { }
}

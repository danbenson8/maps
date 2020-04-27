import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {

    constructor() { }

    // TODO improve usefulness of this
    log(type: string,
        details: any,
        message?: string) {
        switch (type) {
            case 'error': {
                console.log(`${message}, ${details}`);
                break;
            }
            case 'request': {
                break;
            }
            case 'log': {
                break;
            }
            case 'ignore': {
                break;
            }
            default: {
                break;
            }
        }
    }

}

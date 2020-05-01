export class ApiData {
    constructor(
        private dataFromApi?: object
    ) {
        this.convertApi();
    }

    convertApi() {
        for (let entry in this.dataFromApi) {
            this[entry] = this.dataFromApi[entry];
        }
        delete this.dataFromApi;
    }
}

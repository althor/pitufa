export class Phone {
    #region;
    #number;

    constructor(region: string, number: string) {
        this.#region = region;
        this.#number = number;
    }

    get region() {
        return this.#region;
    }   
    
    set region(value: string) {
        this.#region = value;
    }

    get number() {
        return this.#number;
    }  

    set number(value: string) {
        this.#number = value;
    }
}
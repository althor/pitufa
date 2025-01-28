import { Phone } from "./Phone.js";

export class Contact {
    #name;
    #phone;
    #email;

    constructor(name:string, phone:Phone, email:string) {
        this.#name = name;
        this.#phone = phone;
        this.#email = email;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get phone() {
        return this.#phone;
    }

    set phone(value) {
        this.#phone = value;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        this.#email = value;
    }
}
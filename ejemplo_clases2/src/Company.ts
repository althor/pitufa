import { Contact } from './Contact';

export class Company {
    #nif;
    #name;
    #contact;

    constructor(nif: string, name: string, contact: Contact) {
        this.#nif = nif;
        this.#name = name;
        this.#contact = contact;
    }

    get nif() {
        return this.#nif.toUpperCase();
    }
    get name() {
        return this.#name;
    }

    get contact() {
        return this.#contact;
    }

    set nif(value: string) {
        this.#nif = value;
    }

    set name(value: string) {
        this.#name = value;
    }

    set contact(value: Contact) {
        this.#contact = value;
    }
}
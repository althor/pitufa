import { Company } from './Company';
import { Contact } from './Contact';
import { Phone } from './Phone';
import { Product } from './Product';

export class Invoice {
    static #brand = new Company('68323392y', 'Boracay', new Contact("José Perez", new Phone("+34","999555444"), "jperez@ñalala.com"));
    static #lastId = 0;
    static #getID() {
        const year = new Date().getFullYear();
        const id = String(year) + '/' + String(++this.#lastId);
        return id;
    }

    #id = Invoice.#getID();
    #client;
    #product;
    #amount;
    #iva;

    constructor(company: Company, product: Product, amount: number, iva: number = 1.21) {
        this.#product = product;
        this.#amount = amount;
        this.#iva = iva;
        this.#client = company;
    }
    get client() {
        return this.#client;
    }

    #calculatePrice() {
        return this.#amount * this.#product.unityPrice;
    }

    printInvoice() {
        const price = this.#calculatePrice();
        const total = price * this.#iva;

        const invoice = `
        ${Invoice.#brand.name}
        Nif: ${Invoice.#brand.nif}

        Datos cliente
        Nombre: ${this.#client.name}
        Nif: ${this.#client.nif}

        Factura ${this.#id}
        ${this.#product.name} + ${this.#amount} unidades a ${
            this.#product.unityPrice
        }€ 
        Total.................. ${price}€
        ----------------------------------------------
        Total + IVA ........... ${total}
        `;
        console.log(invoice);
    }
}
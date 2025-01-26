import { Company } from './Company';
import { Product } from './Product';
import { Invoice } from './Invoice';
import { Contact } from './Contact';
import { Phone } from './Phone';

const client1 = new Company('5656565843D', 'Acme', new Contact('Juan Lopez', new Phone("+34","999555444"), "jlopez@ñalala.com"));
const apples = new Product('123', 'apples', 4);
const mobile = new Product('124', 'mobile', 400);

const invoice1 = new Invoice(client1, apples, 20, 1.04);

const invoice2 = new Invoice(
    new Company('6567565843D', 'CAS', new Contact('Osito Panda', new Phone("+34","444777666"), "opanda@ñalala.com")),
    mobile,
    1,
    400
);

const invoice3 = new Invoice(invoice2.client, apples, 20, 1.04);

console.log(invoice1, invoice2);
invoice1.printInvoice();
invoice2.printInvoice();
invoice3.printInvoice();
export class Product {
  #skud;
  #name;
  #unityPrice;

  constructor(skud: string, name: string, unitaryPrice: number) {
    this.#skud = skud;
    this.#name = name;
    this.#unityPrice = unitaryPrice;
  }

  get skud() {
    return this.#skud;
  }

  set skud(value: string) {
    this.#skud = value;
  }

  get name() {
    return this.#name;
  }

  set name(value: string) {
    this.#name = value;
  }

  get unityPrice() {
    return this.#unityPrice;
  }

  set unityPrice(value: number) {
    this.#unityPrice = value;
  }
}

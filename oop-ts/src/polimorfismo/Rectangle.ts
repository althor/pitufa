import { Figura } from './Figura.js';
import { Perimeter } from './Perimeter.js';

// Clase Rectangle que extiende de Figura e implementa Perimeter
// Está obligada a implementar el método perimeter() de la interfaz Perimeter
export class Rectangle extends Figura implements Perimeter {
  #base;
  #height;

  constructor(base: number, height: number) {
    super();
    this.#base = base;
    this.#height = height;
  }
  perimeter(): number {
    return 2 * (this.#base + this.#height);
  }

  area(): number {
    return this.#base * this.#height;
  }
}

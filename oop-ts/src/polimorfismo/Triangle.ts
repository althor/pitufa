import { Figura } from './Figura.js';
import { Perimeter } from './Perimeter.js';

// Está obligada a implementar el método perimeter() de la interfaz Perimeter
export class Triangle extends Figura implements Perimeter {
  #base;
  #height;

  constructor(base: number, height: number) {
    super();
    this.#base = base;
    this.#height = height;
  }
  perimeter(): number {
    const sideLength = Math.sqrt((this.#base / 2) ** 2 + this.#height ** 2);
    return this.#base + 2 * sideLength;
  }

  area(): number {
    return (this.#base * this.#height) / 2;
  }
}

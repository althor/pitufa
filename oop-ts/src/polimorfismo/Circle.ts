import { Figura } from './Figura.js';
import { Perimeter } from './Perimeter.js';

// Está obligada a implementar el método perimeter() de la interfaz Perimeter
export class Circle extends Figura implements Perimeter {
  #radius;

  constructor(radius: number) {
    super();
    this.#radius = radius;
  }
  perimeter(): number {
    return 2 * Math.PI * this.#radius;
  }

  area(): number {
    return Math.PI * this.#radius ** 2;
  }
}

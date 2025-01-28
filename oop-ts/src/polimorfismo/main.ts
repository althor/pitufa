import { Figura } from './Figura.js';
import { Rectangle } from './Rectangle.js';
import { Triangle } from './Triangle.js';
import { Circle } from './Circle.js';
import { Perimeter } from './Perimeter.js';

function printArea(figura: Figura): void {
  console.log(
    'El área de un objeto de tipo ' + figura.constructor.name + ' es: ',
  );
  console.log(figura.area());
}

function printPerimeter(perimeter: Perimeter): void {
  console.log(
    'El perímetro de un objeto de tipo ' + perimeter.constructor.name + ' es: ',
  );
  console.log(perimeter.perimeter());
}

let rectangle1 = new Rectangle(10, 20);
let rectangle2 = new Rectangle(30, 40);

let triangle1 = new Triangle(10, 20);
let triangle2 = new Triangle(30, 40);

let circle1 = new Circle(10);
let circle2 = new Circle(20);

// La funcion printArea espera recibir un objeto de tipo Figura
// y llama al método area() del objeto recibido.
// Como cada clase tiene su propia implementación del método area(),
// el método area() que se ejecuta es el correspondiente a la clase del objeto recibido.

// Como todos los objetos son Figura por herencia podemos invocar al método printArea con todos éllos
// aunque la interfaz de printArea diga que espera un objeto de tipo Figura
printArea(rectangle1);
printArea(rectangle2);

printArea(triangle1);
printArea(triangle2);

printArea(circle1);
printArea(circle2);

// La funcion printPerimeter espera recibir un objeto de tipo Perimeter
// y llama al método perimeter() del objeto recibido.
// Como cada clase tiene su propia implementación del método perimeter(),
// el método perimeter() que se ejecuta es el correspondiente a la clase del objeto recibido.
printPerimeter(rectangle1);
printPerimeter(rectangle2);

printPerimeter(triangle1);
printPerimeter(triangle2);

printPerimeter(circle1);
printPerimeter(circle2);

const Persona = require("./Persona");

// Definición del tipo de dato Español que hereda de Persona
class Español extends Persona {
  // Definimos los atributos como privados
  #dni;

  constructor(nombre, edad, ciudad, dni) {
    super(nombre, edad, ciudad);
    this.dni = dni;
  }

  // Definimos los métodos getter y setter para cada atributo
  // Esto nos permite acceder a los atributos de la clase como si fueran públicos y añadir lógica en caso de que sea necesario, como por ejemplo, comprobar que el valor de un atributo es correcto antes de asignarlo

  // Getter y setter del dni
  // Devuelve el dni en mayúsculas
  get dni() {
    return this.#dni.toUpperCase();
  }

  set dni(value) {
    this.#dni = value;
  }

  greeting() {
    super.greeting();
    console.log(`Mi dni es ${this.dni}`);
  }
}

module.exports = Español;

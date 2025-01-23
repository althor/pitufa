const Español = require("./Espanol");

class Riojano extends Español {
  // Definimos los atributos como privados
  #tarjea_sanitaria_rio;

  constructor(nombre, edad, ciudad, dni, tarjea_sanitaria_rio) {
    super(nombre, edad, ciudad, dni);
    this.tarjea_sanitaria_rio = tarjea_sanitaria_rio;
  }

  // Definimos los métodos getter y setter para cada atributo
  // Esto nos permite acceder a los atributos de la clase como si fueran públicos y añadir lógica en caso de que sea necesario, como por ejemplo, comprobar que el valor de un atributo es correcto antes de asignarlo
  get tarjea_sanitaria_rio() {
    return this.#tarjea_sanitaria_rio;
  }

  set tarjea_sanitaria_rio(value) {
    this.#tarjea_sanitaria_rio = value;
  }

  greeting() {
    super.greeting();
    console.log(`Mi tarjeta de rioja es ${this.tarjea_sanitaria_rio}`);
  }
}

module.exports = Riojano;

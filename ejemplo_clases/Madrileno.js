const Español = require("./Espanol");

// Definición del tipo de dato Madrileno que hereda de Español
class Madrileno extends Español {
  #tarjea_sanitaria_cam;

  constructor(nombre, edad, ciudad, dni, tarjea_sanitaria_cam) {
    super(nombre, edad, ciudad, dni);
    this.tarjea_sanitaria_cam = tarjea_sanitaria_cam;
  }

  // Definimos los métodos getter y setter para cada atributo
  // Esto nos permite acceder a los atributos de la clase como si fueran públicos y añadir lógica en caso de que sea necesario, como por ejemplo, comprobar que el valor de un atributo es correcto antes de asignarlo
  get tarjea_sanitaria_cam() {
    return this.#tarjea_sanitaria_cam;
  }

  set tarjea_sanitaria_cam(value) {
    this.#tarjea_sanitaria_cam = value;
  }

  greeting() {
    super.greeting();
    console.log(`Mi tarjeta cam es ${this.tarjea_sanitaria_cam}`);
  }
}

module.exports = Madrileno;

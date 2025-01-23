// Definición del tipo de dato Persona
class Persona {
  // Definimos los atributos como privados
  #name;
  #age;
  #city;

  constructor(nombre, edad, ciudad) {
    this.name = nombre;
    this.age = edad;
    this.city = ciudad;
  }

  // Función estática que devuelve si una edad es adulta o no
  static isAdult(age) {
    return age >= 18;
  }

  // Definimos los métodos getter y setter para cada atributo
  // Esto nos permite acceder a los atributos de la clase como si fueran públicos y añadir lógica en caso de que sea necesario, como por ejemplo, comprobar que el valor de un atributo es correcto antes de asignarlo
  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value;
  }

  get age() {
    return this.#age;
  }

  // Setter de la edad
  // Comprobamos que el valor de la edad es un número y mayor que 0 antes de asignarlo
  set age(value) {
    if (typeof value === "number" && value > 0) {
      this.#age = value;
    } else {
      console.error("Invalid age");
    }
  }

  get city() {
    return this.#city;
  }

  set city(value) {
    this.#city = value;
  }

  greeting() {
    console.log(`Hola, soy ${this.name} y tengo ${this.age} años`);
  }
}

module.exports = Persona;

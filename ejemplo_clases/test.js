const Persona = require("./Persona");
const Español = require("./Espanol");
const Madrileno = require("./Madrileno");
const Riojano = require("./Riojano");

// Creamos algunas instancias de las clases
const pepe = new Persona("Pepe", 33, "Madrid");
const ernestina = new Español("Ernestina", 22, "Toledo", "12345678a");
const ramon = new Madrileno("Ramon", 45, "Ibiza", "87654321b", "CAM12345");
const luis = new Riojano("Luis", 30, "Logroño", "11223344c", "RIO12345");

console.log(pepe);
pepe.greeting();
console.log("-----------------");

console.log(ernestina);
ernestina.greeting();
console.log("-----------------");

console.log(ramon);
ramon.greeting();
console.log("-----------------");

console.log(luis);
luis.greeting();
console.log("-----------------");

// Como son objetos, se puede acceder a sus propiedades como a los objetos normales que siempre has usado como {}. La sintaixs es la siguiente: objeto.propiedad o objeto.metodo()
// Date cuenta que las propiedades privadas no se pueden acceder directamente, pero sí a través de los métodos getter y setter
console.log(`${pepe.name} es una persona`);
console.log(`${ernestina.name} es un español`);
console.log(`${ramon.name} es un madrileño`);
console.log(`${luis.name} es un riojano`);

console.log(
  `${ramon.name} tiene el atributo tarjea_sanitaria_cam con valor ${ramon.tarjea_sanitaria_cam}`
);
console.log(
  `${luis.name} tiene el atributo tarjea_sanitaria_rio con valor ${luis.tarjea_sanitaria_rio}`
);

console.log(`${ramon.name} tiene el atributo dni con valor ${ramon.dni}`);
console.log(`${luis.name} tiene el atributo dni con valor ${luis.dni}`);

// Vamos a intentar asignar un valor incorrecto a la edad de una persona
pepe.age = "54";
console.log(`${pepe.name} tiene ${pepe.age} años`);

// Vamos a intentar asignar un valor incorrecto a la edad de un madrileño
ramon.age = "32";
console.log(`${ramon.name} tiene ${ramon.age} años`);

// Vamos a intentar asignar un valor incorrecto a la edad de un riojano
luis.age = "27";
console.log(`${luis.name} tiene ${luis.age} años`);

// Vamos a intentar asignar un valor incorrecto a la edad de un español
ernestina.age = "43";
console.log(`${ernestina.name} tiene ${ernestina.age} años`);

// Vamos a intentar asignar un valor correcto a la edad de una persona
pepe.age = 29;
console.log(`${pepe.name} tiene ${pepe.age} años`);

// Probamos la función estática isAdult. Como es estática, no es necesario crear una instancia de la clase para poder usarla. Se puede llamar directamente desde la clase
console.log(Persona.isAdult(18)); // true
console.log(Persona.isAdult(17)); // false

// Si intentamos llamar a la función isAdult desde una instancia de la clase, nos dará un error
try {
  pepe.isAdult(17);
} catch (error) {
  console.error(error.message);
}


// Definición de la clase Persona con atributos nombre, edad y ciudad
class Persona {
  constructor(nombre, edad, ciudad) {
    this.name = nombre;
    this.age = edad;
    this.city = ciudad;
  }

  greeting() {
    console.log(`Hola, soy ${this.name} y tengo ${this.age} años`);
  }
}

// Definiendo la clase Español que hereda de Persona y añade el atributo dni
class Español extends Persona {
  constructor(nombre, edad, ciudad, dni) {
    super(nombre, edad, ciudad);
    this.dni = dni;
  }

  greeting() {
    super.greeting();
    console.log(`Mi dni es ${this.dni}`);
  }
}

// Definiendo la clase Madrileno que hereda de Español y añade el atributo tarjea_sanitaria_cam
class Madrileno extends Español {
  constructor(nombre, edad, ciudad, dni, tarjea_sanitaria_cam) {
    super(nombre, edad, ciudad, dni);
    this.tarjea_sanitaria_cam = tarjea_sanitaria_cam;
  }

  greeting() {
    super.greeting();
    console.log(`Mi tarjeta cam es ${this.tarjea_sanitaria_cam}`);
  }
}

// Definiendo la clase Riojano que hereda de Español y añade el atributo tarjea_sanitaria_rio
class Riojano extends Español {
  constructor(nombre, edad, ciudad, dni, tarjea_sanitaria_rio) {
    super(nombre, edad, ciudad, dni);
    this.tarjea_sanitaria_rio = tarjea_sanitaria_rio;
  }

  greeting() {
    super.greeting();
    console.log(`Mi tarjeta de rioja es ${this.tarjea_sanitaria_rio}`);
  }
}


// Construimos distintos objetos de cada tipo de clase
// CAda uno de ellos tiene sus propias propiedades y métodos. Las propiedades de su clase y de las clases de las que hereda
const persona1 = new Persona("Pepe", 33, "sant lluis");
const espanol1 = new Español("Leonchi", 3, "arnuero", "12345678A");
const madrileno1 = new Madrileno("Osete", 4, "madrid", "9876431B", "11122233444");
const riojano1 = new Riojano("Pandi", 11, "logroño", "55447788D", "AAERG34T8HG");

console.log("------------- persona 1 -------------");
console.log(persona1);
persona1.greeting();
console.log("-------------------------------------");


console.log("------------- espanol 1 -------------");
console.log(espanol1);
espanol1.greeting();
console.log("-------------------------------------");


console.log("------------- madrileno 1 -------------");
console.log(madrileno1);
madrileno1.greeting();
console.log("-------------------------------------");


console.log("------------- riojano 1 -------------");
console.log(riojano1);
riojano1.greeting();
console.log("-------------------------------------");




 // Como son objetos, se puede acceder a sus propiedades como a los objetos normales que siempre has usado como {}
console.log(`${persona1.name} es una persona`);
console.log(`${espanol1.name} es un español`);
console.log(`${madrileno1.name} es un madrileño`);
console.log(`${riojano1.name} es un riojano`);


console.log(`${madrileno1.name} tiene el atributo tarjea_sanitaria_cam con valor ${madrileno1.tarjea_sanitaria_cam}`);
console.log(`${riojano1.name} tiene el atributo tarjea_sanitaria_rio con valor ${riojano1.tarjea_sanitaria_rio}`);

console.log(`${madrileno1.name} tiene el atributo dni con valor ${madrileno1.dni}`);
console.log(`${riojano1.name} tiene el atributo dni con valor ${riojano1.dni}`);





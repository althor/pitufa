// function User(nombre, edad, ciudad) {
//   this.name = nombre;
//   this.age = edad;
//   this.city = ciudad;
//   this.greeting = function () {
//     console.log(`Hola, soy ${this.name} y soy de ${this.city}`);
//   };
// }

class User {
  constructor(nombre, edad, ciudad) {
    this.name = nombre;
    this.age = edad;
    this.city = ciudad;
  }

  greeting() {
    console.log(`Hola, soy ${this.name} y tengo ${this.age} años`);
  }
}

const user1 = new User("Pepe", 33, "madrid");
const user2 = new User("Ernestina", 22, "toledo");
const user3 = new User("Ramon", 45, "ibiza");

console.log(user1);
user1.greeting();
console.log("-----------------");
console.log(user2);
user2.greeting();
console.log("-----------------");
console.log(user3);
user3.greeting();
console.log("-----------------");


class Student extends User {
  constructor(nombre, edad, ciudad, course = "Angular") {
    super(nombre, edad, ciudad);
    this.course = course;
  }

  greeting() {
    super.greeting();
    console.log(`Estudio ${this.course}`);
  }
}

const estudiante1 = new Student("Pepe", 33, "madrid", "React");
console.log(estudiante1);
estudiante1.greeting();
console.log("-----------------");

/*eslint-disable */
class User {
    name: string;
    age: number;
  
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  
    greet() {
      return `Hello, my name is ${this.name}`;
    }
  }
  
  class Admin extends User {
    role: string;
  
    constructor(name: string, age: number, role: string) {
      super(name, age);
      this.role = role;
    }
  }
  

  let user1 = new User('Pepe', 30);
  let user2 = new User('Juan', 40);

  let admin1 = new Admin('Admin', 30, 'Super Admin');
  let admin2 = new Admin('Admin2', 40, 'Super Admin');

  
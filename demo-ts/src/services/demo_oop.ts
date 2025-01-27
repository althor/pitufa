/*eslint-disable */

{
interface UserInterface {
    name: string;
    age: number;
    pet?: string;
    readonly id: string;
  }

  let user1: UserInterface = new UserInterface("algo", 13);
  let user2: UserInterface = { name: 'Pepe', age: 30, id: '123' };

  class UserClass {
    name: string;
    age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  }
  
  let user3: UserClass = { name: 'Pepe', age: 30 };

  let user4: UserClass = new UserClass('Pepe', 30);

}
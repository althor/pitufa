/*eslint-disable */

// Definimos una interfaz llamada Person con tres propiedades name, age y email
interface Person {
  name: string;
  age: number;
  email?: string;
  readonly id: number;
}

// Definimos una interfaz llamada Employee que extiende de Person y agrega tres propiedades department, salary y tasks
interface Employee extends Person {
  department: string;
  salary: number;
  tasks: string[];
  work(): void;
}

// Definimos una clase llamada Developer que implementa la interfaz Employee
class Developer implements Employee {
  // Properties from Person
  name: string;
  age: number;
  readonly id: number;

  // Properties from Employee
  department: string;
  salary: number;
  tasks: string[];

  constructor(
    name: string,
    age: number,
    id: number,
    department: string,
    salary: number,
  ) {
    this.name = name;
    this.age = age;
    this.id = id;
    this.department = department;
    this.salary = salary;
    this.tasks = [];
  }

  // Como esta clase implementa la interfaz Employee, es necesario implementar el método work
  work(): void {
    console.log(
      `${this.name} is working on ${this.tasks.length} tasks in the ${this.department} department`,
    );
    this.tasks.forEach((task) => console.log(`- ${task}`));
  }
  email?: string;

  // Additional method specific to Developer
  addTask(task: string): void {
    this.tasks.push(task);
  }
}

// Using the interfaces and class
const dev = new Developer('John', 30, 1, 'Engineering', 75000);
dev.addTask('Implement new feature');
console.log(dev.tasks);

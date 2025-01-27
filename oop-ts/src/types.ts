/*eslint-disable */

// Definimos un tipo de dato personalizado llamado StringOrNumber que puede ser string o number
type StringOrNumber = string | number;

let myVar1: StringOrNumber = 'Pepe';
let myVar2: StringOrNumber = 30;


// Definiendo un tipo de dato personalizado llamado Status que puede ser "pending", "approved" o "rejected"
type Status = "pending" | "approved" | "rejected";

let status1: Status = "pending";
let status2: Status = "approved";
let status3: Status = "rejected";


// Definimos un tipo de dato personalizado llamado Point que tiene dos propiedades x y y de tipo number
type Point = {
    x: number;
    y: number;
  };

let punto1: Point = { x: 10, y: 20 };
let punto2: Point = { x: 30, y: 40 };


// Definiendo un tipo de dato personalizado llamado PointAsClass que tiene dos propiedades x y y de tipo number
class PointAsClass {
    x: number;
    y: number;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

let punto3 = new PointAsClass(10, 20);
let punto4 = new PointAsClass(30, 40);

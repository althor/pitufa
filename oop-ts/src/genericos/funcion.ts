// Una función genérica que toma un valor de tipo T y devuelve el mismo valor de tipo T.
function identity<T>(value: T): T {
  return value;
}

// Example usage:
let numberIdentity = identity<number>(42);
console.log(numberIdentity); // Output: 42

let stringIdentity = identity<string>('Hello, TypeScript!');
console.log(stringIdentity); // Output: Hello, TypeScript!

let arrayIdentity = identity<number[]>([1, 2, 3, 4]);
console.log(arrayIdentity); // Output: [1, 2, 3, 4]

//En este ejemplo, la función de identidad es una función genérica con un parámetro de tipo T.
//El tipo T se determina cuando se llama a la función, lo que le permite trabajar con diferentes tipos.

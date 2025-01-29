// Una clase genérica para una estructura de datos de pila
class Stack<T> {
    private items: T[] = [];

    // Push a new item onto the stack
    push(item: T): void {
        this.items.push(item);
    }

    // Pop an item off the stack
    pop(): T | undefined {
        return this.items.pop();
    }

    // Check if the stack is empty
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // Get the current size of the stack
    size(): number {
        return this.items.length;
    }
}

// Example usage:
let numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);
console.log(numberStack.pop()); // Output: 3
console.log(numberStack.size()); // Output: 2

let stringStack = new Stack<string>();
stringStack.push("a");
stringStack.push("b");
stringStack.push("c");
console.log(stringStack.pop()); // Output: c
console.log(stringStack.size()); // Output: 2



//En este ejemplo, la clase Pila es una clase genérica con un parámetro de tipo T.
// Esto permite a la pila almacenar elementos de cualquier tipo manteniendo la seguridad de tipo.

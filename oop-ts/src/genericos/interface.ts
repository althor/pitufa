// Una interfaz genérica para un repositorio de datos
interface Repository<T> {
    getById(id: number): T;
    getAll(): T[];
    add(item: T): void;
    update(item: T): void;
    delete(id: number): void;
}

// Ejemplo de implementación de la interfaz Repository para un tipo User
class UserRepository implements Repository<User> {
    private users: User[] = [];

    getById(id: number): User {
        return this.users.find(user => user.id === id) as User;
    }

    getAll(): User[] {
        return this.users;
    }

    add(user: User): void {
        this.users.push(user);
    }

    update(user: User): void {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            this.users[index] = user;
        }
    }

    delete(id: number): void {
        this.users = this.users.filter(user => user.id !== id);
    }
}

// Example User type
type User = {
    id: number;
    name: string;
};

// Example usage:
let userRepository = new UserRepository();
userRepository.add({ id: 1, name: "Alice" });
userRepository.add({ id: 2, name: "Bob" });

console.log(userRepository.getById(1)); // Output: { id: 1, name: "Alice" }
console.log(userRepository.getAll()); // Output: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]


//En este ejemplo, la interfaz Repository es una interfaz genérica con un parámetro de tipo T.
// La clase UserRepository implementa la interfaz Repository para un tipo User, proporcionando métodos seguros de tipo para gestionar objetos User.
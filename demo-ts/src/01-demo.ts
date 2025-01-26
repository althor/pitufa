/*eslint-disable */

// Inferencia de tipos
// Chequeo de tipos

// Declaración const / let
let x = 22;
// x = 'Pepe'; // Error de TS

// Tipo inferido es any
let z;
z = 22;
z = 'Pepe';

// let v. const: const y tipos literales
{
    const x = 'Pepe';
    // x = 'Juan'; ERROR DE JS
}

// let y tipos literales as const

{
    let x: 'Pepe' = 'Pepe';
    // x = 'Juan'; // Error de TS
    console.log(x);
}

// conversión / aserción de tipos

{
    function foo() {
        const z1 = document.querySelector('h1') as HTMLHeadingElement;
        const z2 = document.querySelector('h1') as unknown as number;

        z1.addEventListener('click', (event) => {
            const element = event.target as HTMLButtonElement;
            element.disabled = false;
        });
    }
}

// Anotación de tipo --> : tipo
{
    let z: number;
    z = 22;
    // z = 'Pepe'; Error de TS
}

// Declaración const / let NO SE ANOTA
{
    let x: number = 22; // SOBRA number
}

// Anotamos los parámetros

function add(a: number, b: number): number {
    return a + b;
}

const s = (a: number, b: number): number => a - b;

// Objetos Arrays y Tuplas

const user: {
    readonly name: string;
    age: number;
    job?: string;
} = {
    name: 'Pepe',
    age: 23,
};

user.age = 24;

// Propiedades opcionales
{
    user.job = 'developer';
    delete user.job;

    if (user.job) {
        console.log(`Trabajo de ${user.job}`);
    } else {
        console.log(`Ahora no trabajo`);
    }

    // Parámetros opcionales
    // Narrowing: restricción del tipo
    const foo = (a?: string) => {
        if (!a) return;
        console.log(a.toLocaleLowerCase());
    };

    foo();
}

// Arrays
{
    const data = [1, 2, 3];
    data.push(23);
    // data.push('Pepa') Error de tipo

    const foo = (data: number[]) => {
        data.map((item) => item * item);
    };

    // No se usa
    // const foo2 = (data: Array<number>) => {
    //     data.map((item) => item * item);
    // };
}
{
    const t: (number | string)[] = [1, 2, 'Pepe'];
    t.push('Luis');
}
// Tupla
{
    const t1: [string, number] = ['Pepe', 2];
    const t2: readonly [string, number] = ['Juan', 4];

    t1[1] = 5;

    t1.push('Pepe');
    console.log(t1.length);
}
// Firmas de indice
{
    // const user: {
    //     name: string;
    //     age: number;
    // } = {
    //     name: 'Pepe',
    //     age: 23,
    // };
    // user.age = 24;
    // for (const key in user) {
    //     const element = user[key];
    // }
    // as { [key: string]: string | number }
}
{
    const user: { [key: string]: string | number | boolean } = {
        name: 'Pepe',
        age: 23,
        hasJob: true,
    };

    user.algo = '';

    const p = 'score';
    console.log(user[p]);

    for (const key in user) {
        const element = user[key];
    }
}
// Union de tipos
{
    let id: string | number;
    id = 12;
    id = 'KO923';

    const fooString = (a: string) => {};
    const fooNumber = (a: number) => {};

    let x: string | number = 0;
    // Error fooString(x)
    // Error fooNumber(x)

    const foo = (a: string | number) => {
        if (typeof a === 'string') {
            a.slice();
        } else {
            a.toPrecision();
        }
    };

    foo(x);
}
// Union de tipos literales
{
    let state: 'Idle' | 'Success' | 'Error';
    state = 'Success';
    state = 'Error';
}

// Uniones discriminadas
{
    type Success = { status: 'success'; data: string[] };
    type Fail = { status: 'error'; error: Error };

    const foo = (a: Success | Fail) => {
        if (a.status === 'success') {
            a.data.length;
        } else if (a.status === 'error') {
            a.error.message;
        } else {
            console.log('No se como estoy aquí');
        }
    };
}

// Tipos intersection
{
    let c: (1 | 2 | 3) & (2 | 4 | 6);
    c = 2;
}
{
    let x: { [key: string]: any };
    x = { a: 12 };
    x.b = null;
    x.c = [];
}
{
    let c: { id: number } & { name: string };
    c = { id: 12, name: 'Pepe' };
}
// Tipos propios
// Alias v. Interface

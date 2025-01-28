# OOP - tipos, interfaces, clases

## Conceptos clave

1. **Clases y Objetos**:

- _Clase_: Es una plantilla o blueprint para crear objetos. Define propiedades (atributos) y métodos (funciones) que los objetos creados a partir de la clase pueden tener.

      Una clase es un tipo. Cuando definimos una clase estamos definiendo un tipo nuevo. Pero es un tipo especial, con más capacidades que lo que es un simple tipo. Puedes definir además métodos que pertenecen a ese tipo y que va a ofrecer cada objeto/instancia que crees de esa clase/tipo.

- _Objeto_: Es una instancia de una clase. Representa una entidad con propiedades y comportamiento definidos por la clase.

2. **Encapsulamiento**:
   El encapsulamiento es el concepto de agrupar datos (atributos) y métodos (funciones) en una única unidad llamada clase. Restringe el acceso directo a algunos de los componentes de un objeto, lo que puede prevenir la modificación accidental de datos.

3. **Herencia**:
   La herencia permite que una nueva clase (clase derivada) herede propiedades y métodos de una clase existente (clase base). Esto promueve la reutilización del código y establece una jerarquía natural entre clases.

4. **Polimorfismo**:
   El polimorfismo permite que los métodos hagan cosas diferentes basadas en el objeto sobre el que están actuando. Se puede lograr a través de la sobrescritura de métodos (el mismo nombre de método en una clase derivada) y la sobrecarga de métodos (el mismo nombre de método con diferentes parámetros).

5. **Abstracción**:
   La abstracción es el concepto de ocultar los detalles complejos de la implementación y mostrar solo las características esenciales del objeto. Proporciona una separación clara entre lo que hace un objeto y cómo lo hace.

```typescript
// Clase base
class Animal {
  // Propiedad encapsulada
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Método abstracto
  speak(): void {
    throw new Error(
      'Método abstracto, debe ser implementado por la clase derivada',
    );
  }

  // Método para obtener el nombre
  getName(): string {
    return this.name;
  }
}

// Clase derivada
class Dog extends Animal {
  // Sobrescritura del método speak
  speak(): void {
    console.log(`${this.getName()} dice Woof!`);
  }
}

// Clase derivada
class Cat extends Animal {
  // Sobrescritura del método speak
  speak(): void {
    console.log(`${this.getName()} dice Meow!`);
  }
}

// Creando objetos
const dog = new Dog('Buddy');
const cat = new Cat('Whiskers');

// Usando polimorfismo
const animals: Animal[] = [dog, cat];
animals.forEach((animal) => animal.speak());
```

### Explicación

- **Clase y Objeto**: Animal es una clase base, y Dog y Cat son clases derivadas. dog y cat son objetos de Dog y Cat, respectivamente.

- **Encapsulamiento**: La propiedad name está encapsulada dentro de la clase Animal y solo es accesible a través del método getName.

- **Herencia**: Las clases Dog y Cat heredan de la clase Animal.

- **Polimorfismo**: El método speak es implementado de manera diferente en las clases Dog y Cat, y el método correcto se llama basado en el tipo de objeto.

- **Abstracción**: La clase Animal proporciona un método abstracto speak que debe ser implementado por las clases derivadas, ocultando los detalles de la implementación específica.

OOP ayuda a organizar el código, haciéndolo modular y más fácil de mantener. Este enfoque es útil en aplicaciones grandes y complejas, donde la estructura clara y la reutilización del código son esenciales.

## Javascript nativo

Javascript ofrece la posibilidad de definir Clases usando la palabra reservada `class`

Ejemplo de modelado de entidades en javascript nativo está en la aplicación `ejemplo_clases`. En este ejemplo tenemos realizado el modelado de distintas entidades mostrando:

- Modelado de distintas entidades
- Definición de atributos/propiedades para cada clase (públicos o privados)
- Definición del constructor en cada clase
- Definición de funciones propias para clases
- Herencia entre clases. De esta manera una clase hereda las propiedades de su clase padre y por tanto tiene sus atributos y funciones propias más las atributos y funciones propias de todas las clases que pueda tener por encima.

## Typescript

A la definición de `class` disponible en javascript nativo añade:

- tipos: posibilidad de definir tipos propios (que pasarán a estar disponibles igual que los tipos existentes: `number`, `string`, `boolean`...)
- interfaces: posibilidad de definir una interfaz para definir cuál debe ser la forma de un objeto o una clase

## Clases

Se usan para modelar tipos de entidades. Son una plantilla para crear nuevos objetos (también llamados instancias) de esa clase.

Sirven para encapsular juntos datos (atributos/propiedades de la calse) con código (funciones propias de ese tipo de clase).

¿Son un tipo? Sí, al definir una clase XXX estás definiendo un nuevo tipo llamado XXX. Un tipo más poderoso porque le puedes definir funciones propias, le puedes definir herencia desde otra clase...

**Nota**: La herencia de clases en OOP funciona básicamente igual que lo que se llama cascada en los CSS. El elemento de abajo hereda todo lo que tengan sus antecesores.

### Ejemplo

```javascript
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
```

Este ejemplo muestra el posible modelado de usuario y administrador para una posible aplicación que necesite distinguir entre un usuario y un administrador.

- Para un usuario tendremos los atributos: nombre y edad.
- Para un administrador tendremos los atributos: nombre, edad y rol.

Como un administrador tiene los mismos atributos que un usuario más el de rol podemos modelarlo de modo que un administrador sea asimismo un usuario añadiendo su rol y simplificamos el modelado.

La aplicación:

- Define clase `User` para modelar la información de un usuario:
  - Atributos: `name`, `age`
  - Añade una función propia de `User` llamada `greet` cuya responsabilidad es devolver un texto de saludo del usuario.
- Define clase `Admin` para modelar la información de un administrador:

  - En lugar de definirle a esta clase los atributos `name` y `age` y "duplicar código" hacemos que extienda de la clase `User` y así herede lo que tenga `User`. De este modo además el modelado queda coherente, elegante y fácil de entender:
    `class Admin extends User`
  - Atributos: `role`. Dispone de `name` y `age` por ser también `User`

- Ambas clases definen su función `constructor` con la que crear nuevos objetos (nuevas instancias).

#### Creación de objetos/instancias

Creamos nuevos objetos o nuevas instancias de una clase usando `new`

```javascript
let user1 = new User('Pepe', 30);
let user2 = new User('Juan', 40);

let admin1 = new Admin('Admin', 30, 'Super Admin');
let admin2 = new Admin('Admin2', 40, 'Super Admin');
```

De esta manera estamos creando objetos de una clase. Exactamente de la misma manera que podemos hacer con el tipo String:

```javascript
// Creación de strings como primitivos
const string1 = 'A string primitive';
const string2 = 'Also a string primitive';
const string3 = `Yet another string primitive`;

// Creación de string como nuevo objeto de la clase String
const string4 = new String('A String object');
```

## Tipos

Con `Typescript` se amplía `javascript` con la posibilidad de definir nuestros propios tipos de datos.

- Sirven para deifnir la forma/estructura específica de un dato.
- Permiten combinar tipos primitivos para crear nuestro tipo personalizado.
- Permiten restringir los valores del tipo como tipos literales.
- Variables del tipo se crean del modo habitual

**Nota**: (el `new` se usa para crear objetos/instancias a partir de una `class`)

### Ejemplos

1. Definición de un tipo propio para crear un tipo que defina que un dato puede ser o `number` o `string`

```typescript
type StringOrNumber = string | number;

let myVar1: StringOrNumber = 'Pepe';
let myVar2: StringOrNumber = 30;
```

2. Definición de un tipo propio para crear un tipo que defina que un dato puede ser de un conjunto de literales específicos

```typescript
type Status = 'pending' | 'approved' | 'rejected';

let status1: Status = 'pending';
let status2: Status = 'approved';
let status3: Status = 'rejected';
```

3. Definición de un tipo propio para crear un tipo que defina que un dato es un objeto con dos propiedades y especificamos el tipo cada una de esas propiedades

```typescript
type Point = {
  x: number;
  y: number;
};

let punto1: Point = { x: 10, y: 20 };
let punto2: Point = { x: 30, y: 40 };
```

Este caso, en que estamos modelando unas coordenadas x e y que van juntas (por separado no tienen significado) se puede modelar como una clase en lugar de como tipo:

```typescript
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

let punto3 = new Point(10, 20);
let punto4 = new Point(30, 40);
```

El modelar un punto como clase nos permitiría:

- añadir funciones con lógica propia del punto
- mejor modelado orientado a objetos ya que un punto es algo que "tiene sentido y significado" en el dominio de una aplicación que trabaje con coordenadas.

### Creación

Hemos visto que para crear una variable de un tipo cualquiera se hace en typescript de la manera habitual.

Si para cualquiera de estos tipos intentas crear una variable usando `new`, ni siquiera va a compilar porque no son clases, no existe el constructor de esos tipos:

```typescript
let status4 = new Status('approved'); // esto no compila
let punto3 = new Point(2, 7); // esto no compila
```

## Interfaces

Una interfaz define la cara de fuera (la interfaz, el contrato) de un objeto o de una clase. Define lo que tiene que tener sí o sí cualquier objeto o clase que use esa interfaz.

Actúa como un contrato. Establece las propiedades o funciones que un objeto o clase debe implementar para cumplir con la interfaz.

Una interfaz en programación es un contrato que define un conjunto de métodos y propiedades que una clase debe implementar, sin especificar cómo estos métodos y propiedades deben ser implementados.

Las interfaces se utilizan para garantizar un cierto nivel de abstracción y para imponer una estructura en el código, haciéndolo más modular y fácil de gestionar.

Igual que las clases, las interfaces también pueden extender unas de otras y, por tanto, la de abajo dispone de las propieades/funciones que definan las de encima.

**Nota**: Una interfaz es solo definición de un contrato. No tiene implementación. Las clases sí tienen implementación.

Las interfaces se implementan en un objeto o en una clase. En el caso de una clase se indica que una clase implementa una determinada interfaz así: `class MiClase implements MiInterfaz`

Typescript controla en tiempo de desarrollo y compilación que el objeto o clase que use la interfaz implemente todas las propiedades y funciones que estén declarados en el contrato.

Analogía con el mundo real. La DGT establece que un coche tiene que cumplir:

- luces delanteras de color blanco
- luces traseras de circulación de color rojo
- luces traseras de marcha atraś de color blanco

Y cualquiera que construya un coche debe cumplir con esa "interfaz".

## Ejemplo

Para nuestra aplicación definimos la interfaz User para establecer todo lo que tiene que implementar sí o sí algo un objeto o clase que use esa interfaz.
`User` establece:

- Debe tener un atributo `name`de tipo string
- Debe tener un atributo `age`de tipo number
- Debe tener una función `greet` que devuelva un string. (No implementa la función, solo define la interfaz de la función. Será responsabilidad del objeto o clase implementar esa función con su lógica específica)

Definimos una interfa `Admin` que extiende de `User`. Por tanto cualquier objeto/clase que use `Admin` debe implementar todo lo que especifiquen ambas interfaces.

```typescript
interface User {
  name: string;
  age: number;
  greet(): string;
}

interface Admin extends User {
  role: string;
}
```

### Creación de objetos

#### Creación directa de un objeto del tipo interfaz

Se puede crear un objeto del tipo de una interfaz. En este caso al ser una interfaz, debes implementar todas las propiedades/funciones definidos en la interfaz.

En este caso estamos obligados a que nuestro objeto `Admin` implemente una función con esta interfaz `greet(): string`

**Nota**: Este uso no es el más común. El uso de interfaces es en relación a la orientación objetos. Lo suyo es crear clases que implementen esa interfaz y crear objetos de esa clase con `new MiClase(...)`

```typescript
let admin: Admin = {
  name: 'Pepe',
  age: 30,
  role: 'Super Admin',
  greet() {
    return `Hello, my name is ${this.name}`;
  },
};
```

#### Uso de interfaces en clases

Las interfaces en realidad se usan para definir un contrato que deban cumplir las clases de un modelado. Para obligar al desarrollador a implementar todas las funciones que declara la interfaz.

Es muy común que las librerías públicas definan interfaces y en tu código al usar esas interfaces estás obligado a implementar todas las funciones que éllos hayan decidido definir en sus interfaces. De este modo no se te olvida implementar alguna función ya que además el compilador te avisa y te dice que tal función no está implementada en tu clase.

Usando esas interfaces en una clase:

```typescript
class Administrador implements Admin {
  role: string;
  name: string;
  age: number;

  constructor(name: string, age: number, role: string) {
    this.name = name;
    this.age = age;
    this.role = role;
  }

  greet(): string {
    return `Hello, I am ${this.name}, the ${this.role}`;
  }
}

let administrador1: Administrador = new Administrador(
  'Pepe',
  30,
  'Super Admin',
);
```

## Cuándo usar cada uno

### Usar Tipos cuando:

- Quieres definir un tipo nuevo como combinación de otros tipos
- Quieres definir un tipo para un subconjunto de valores literales específicos
- Creación de tipos de unión o intersección
- Creación de tipos mapeados
- Necesidad de trabajar con tipos primitivos
- Creación de expresiones de tipos complejos

### Utilizar Interfaces cuando:

- Vas a modelar conceptos del negocio (ej. Usuario, Persona, Pelicula, Factura...)
- Establecer una estructura que deben cumplir unos objetos
- Definir formas de objetos
- Necesidad de extender/implementar en clases
- Necesidad de fusión de declaraciones
- Trabajar con diseño orientado a objetos

### Usar Clases cuando:

- Vas a modelar conceptos - Vas a modelar conceptos del negocio (ej. Usuario, Persona, Pelicula, Factura...)
  negocio
- Necesidad de crear instancias
- Necesidad de implementar métodos
- Necesidad de herencia con implementación
- Trabajar con programación orientada a objetos

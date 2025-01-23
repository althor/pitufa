# Ejemplo

Se definen varios tipos/clases que heredan unas de otras.

- Persona es la clase de más arriba.
- Español hereda de Persona
- Madrileño hereda de Español
- Riojano hereda de Español

Definimos cada clase en un fichero independiente. Así queda todo bien organizado y claro.

### constructor
Cada clase define su propia función `constructor` a través de la que se construye un objeto nuevo.

Se llama constructor porque básicamente lo que hace javascript es coger los argumentos que recibe y construir un objeto nuevo del tipo de la clase a partir de los argumentos recibidos.

La forma más habitual es que el constructor defina una interfaz por la que reciba los valores de los atributos mínimos para construir el objeto.

En el ejemplo le definimos a cada clase su propio constructor que recibe valor para todos los atributos del objeto.

## propiedades

Se definen todas las propiedades de todas las clases como privadas.

Esto hará que legalmente no se pueda acceder desde fuera del bloque de la clase a las propiedades.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties

Para permitir que desde fuera sean accesibles tanto para lectura como escritura definimos métodos getter y setter para cada una de las propiedades.

### getter

Permite acceder al valor de un determinado atributo. Al ser una función y no meramente el acceso al atributo permite realizar cualquier tipo de conversión sobre el valor bruto guardado en el atributo.

Ejemplo: el getter del atributo dni convierte el valor a mayúsculas antes de devolverlo, de modo que siempre que se acceda al valor del dni se recuperará en mayúsculas.

### setter

Permite establecer el valor de un determinado atributo. Al ser una función y no meramente el acceso al atributo permite realizar cualquier tipo de validación o análisis o lógica antes de asignar el nuevo valor.

Ejemplo: el setter de la edad comprueba si el valor recibido es correcto. Si no lo es no modifica el atributo del objeto e imprime un mensaje de error por consola.

### uso

La sintaxis de los getter y setter desde fuera es igual que la utilizada para propiedades públicas.
Es decir:

`variable.<nombre_que_tenga_el_getter_o_setter>`

Ejemplo:

`miobjeto.dni`

## static

En JavaScript, la palabra clave static se utiliza para definir métodos y propiedades estáticos para una clase.

Estos miembros estáticos se asocian con la propia clase en lugar de
instancias de la clase. Esto significa que puede llamar a un método estático o
acceder a una propiedad estática directamente en la clase, pero no en una instancia de la clase.

En el ejemplo definimos una función estática en la clase Persona. Al ser una función estática no se invoca sobre un objeto concreto y no tiene acceso a atributos de ningún objeto ya que cuando ejecuta no lo hace sobre un objeto.

La sintaxis de invocación es:

`<nombre_de_la_clase>.<nombre_de_la_propiedad_o_funcion_estatica>`

Ejemplo:

`Persona.isAdult(24)`

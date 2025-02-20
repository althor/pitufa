# Ejemplo servidor que expone una API REST

## API REST

Nuestro servidor se encarga de gestionar la colección de libros de nuestra casa. Para que una aplicación cliente pueda gestionar la colección expone un API REST para gestionar los libros:

### api expuesta

#### /books

##### GET

Obtener todos los libros

##### POST

Crear un libro

#### /books/{id}

##### GET

Consultar un libro determinado

##### DELETE

Borrar un libro determinado

#### Formatos

##### Envío detalle libro

```json
{
  "title": "La saga de los longevos",
  "author": "Eva García Sáenz de Urturi"
}
```

##### Consulta detalle libro

```json
  {
    "id": 1
    "title": "La saga de los longevos",
    "author": "Eva García Sáenz de Urturi"
  }
```

## Diseño interno

### Aplicación express

El servidor define la ruta `/books` para configurar las rutas que cuelgan de ese priemro nivel en un router `routers/books.ts`

#### routers/books.ts

Router para las rutas que cuelgan de `/books`
Define el enrutado por método y url contra la función controladora que se encargará de atender cada tipo de peticion.

#### Middlewares aplicados

Se aplican algunos middlewares para mostrar ejemplo de uso:

- cors
- morgan: este por ejemplo hace un logado automático de cada petición recibida
- parseo de json
- capturador de errores

##### capturador de errores

El último middleware configurado es un controlador de errores para capturar cualquier rotura en tiempo de ejecución y en lugar de que se genere hacia fuera una respuesta por defecto de express o que el servidor rompa y se caiga, generamos una respuesta definida por nosotros y homogénea sea lo que sea que se pueda romper.

```typescript
app.use(errorHandler);
```

`errorHandler` está definido en `middlewares/errorhandler.ts`

#### errors/ApplicationError

Para poder capturar los errores que nos interesen y poder arrastrar hasta el controlador de errores los datos que nos interesen creamos una clase nuestra propia que exitenda de la clase `Error` que ya proporciona express.

En este caso le añadimos propiedades para:

- guardar el código http de respeusta que queramos enviar
- mensaje textual que queramos enviar en la respuesta

En los puntos en los que nos interese generar una respuesta específica para esa funcionalidad para informar de un "error" entonces crearemos un objeto de tipo `ApplicationError` y lo levantaremos con error mediante `throw`

Por ejemplo, si queremos que el controlador de errores gestione la respuesta para los 404 que queramos devolver, en lugar de que cada controlador específico se encargue de generar una respuesta propia podemos homogeneizarlos haciendo:

```typescript
throw new ApplicationError("Not found", 404, "Book not found");
```

### capturador de errores

Está definido en `middlewares/errorhandler.ts`

El tipo propio de Express con el que hace llegar los errores al manejador es `Error`.
Como hemos definido una clase propia para personalizar la información que queremos hacer llegar al controlador cuando capturamos nosotros un error hay que definirlo de modo que lo que le pueda llegar puede ser también un `ApplicationError`

Se encarga de:

- comprobar si lo que llega es un `Error`o un `ApplicationError
- Si es un `Error` genereamos una respuesta 500 con mensaje estándar de respuesta
- Si es un `ApplicationError` generamos una respuesta usando el código y el mensaje encapsuldos en el objeto de error

### Controladores de peticiones

Los componentes que se encargan de atender la petición http que ha llegado y de preparar más tarde la respuesta se conocen comúnmente como controladores.

De modo que un controlador se encarga de atender y preparar la respuesta, pero no hace nada de lógica de negocio real. La lógica real se encarga otro componente al que se le invoca para que haga lo que corresponda en cada petición.

`Petición http desde fuera -> controlador de la petición -> componente que atiende la lógica funcional`

Ubicados en la carpeta `controllers`

### Componentes de servicio

Los componentes que se encargan de implementar la lógica funcional de la aplicación se conocen comúnmente como servicios.

Su responsabilidad es realizar la lógica funcional. Les da igual que haya una petición http o que haya que generar una respuesta http. Se limitan a la lógica funcional.

Ubicados en la carpeta `services`

Son invocados desde la capa de controladores, y un componente de servicio puede apoyarse en otro componente de servicio para realizar la lógica funcional. Así el código queda bien organizado, se evita duplicar código.

### Persistencia usando base de datos

Para usar como persistencia en base de datos hay muchísimas opciones (Mysql, Maria db, postgre, oracle, sqlite...) https://expressjs.com/en/guide/database-integration.html

Este ejemplo utiliza MySQL como persistencia creada en local.

#### librería de mysql

https://www.npmjs.com/package/mysql

Dependencia: `"mysql2": "^3.12.0"`

#### Organización

Lo mismo de siempre. Es conveniente tener el código organizado de modo que cada pieza sea la encargada de algo. Al añadir persistencia en base de datos pues vamos a necesitar alguna pieza que sea la encargada de interactuar con la base de datos. De la misma manera que si me tengo que integrar con la api rest que exponga twitter haría una pieza encargada de interactuar con twitter y no tendría código que tenga que ver con twitter en otros sitios del proyecto.

Para éllo he creado la carpeta `persistence` para tener ubicado ahí la pieza o piezas que interactúen con la base de datos. Como es un ejemplo pequeño y además solo tenemos una base de datos, que es lo habitual, organizamos este código en un fichero llamado `db.ts`

#### Uso

##### conexión

Cuando interactúas con una base de datos como persistencia lo primero que hay que hacer siempre es autoconectar contra la base de datos al arrancar nuestra aplicación/servidor.

Entonces, en el fichero he definido una función llamada `connect` que se encarga de conectar contra la base de datos y guardar la referencia de la base de datos en una variable global para poder usarla en el resto de funcionalidades. En este caso este objeto es de un tipo llamado `Connection` definido en la librería `mysql`.

En el arranque del servidor invocamos automáticamente a esta función para conectar a la base de datos. Lo he puesto como último paso de la creación de la aplicación Express.

Las credenciales de acceso están configuradas para obtenerlas a través de variable de entorno:

Linux:

```bash
export DBPWD=xxxxxxx
export DBUSER=xxxxxxxx
```

windows:

```bash
set DBPWD=xxxxxxx
set DBUSER=xxxxxxxx
```

##### ejecución de queries

En nuestra aplicación vamos a tener que hacer acciones de:

- consulta para obtener registros de la base de datos
- inserción de nuevos datos
- borrado de datos

Es conveniente, en toda aplicación, definir todas las funciones que te vengan bien y que tengan sentido, es decir, que cada una te sirva para realizar algo concreto.

En nuestro caso pues he definido funciones independientes para:

- ejecutar una query que espera obtener un solo registro
- ejecutar una query que espera obtener una lista de registros
- ejecutar una query de borrado
- ejecutar una query de modificaión de datos

##### integración

Si al recibir una petición desde fuera es atendida por un primero elemento controlador que se apoya en un elemento de servicio para aplicar la lógica de negocio que usa un repositorio de libros en memoria ahora habrá que integrarlo contra el acceso a base de datos para persistir los datos en un sistema real y que no desaparezca cuando apagamos el servidor.

De modo que el flujo de la lógica completa de una petición quede:

`Petición http desde fuera -> controlador de la petición -> componente que atiende la lógica funcional -> componente que interactúa con la base de datos para persistir la información`

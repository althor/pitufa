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

#### capturador de errores

Está definido en `middlewares/errorhandler.ts`

El tipo propio de Express con el que hace llegar los errores al manejador es `Error`.
Como hemos definido una clase propia para personalizar la información que queremos hacer llegar al controlador cuando capturamos nosotros un error hay que definirlo de modo que lo que le pueda llegar puede ser también un `ApplicationError`

Se encarga de:

- comprobar si lo que llega es un `Error`o un `ApplicationError
- Si es un `Error` genereamos una respuesta 500 con mensaje estándar de respuesta
- Si es un `ApplicationError` generamos una respuesta usando el código y el mensaje encapsuldos en el objeto de error

#### Controladores de peticiones

Los componentes que se encargan de atender la petición http que ha llegado y de preparar más tarde la respuesta se conocen comúnmente como controladores.

De modo que un controlador se encarga de atender y preparar la respuesta, pero no hace nada de lógica de negocio real. La lógica real se encarga otro componente al que se le invoca para que haga lo que corresponda en cada petición.

`Petición http desde fuera -> controlador de la petición -> componente que atiende la lógica funcional`

Ubicados en la carpeta `controllers`

#### Componentes de servicio

Los componentes que se encargan de implementar la lógica funcional de la aplicación se conocen comúnmente como servicios.

Su responsabilidad es realizar la lógica funcional. Les da igual que haya una petición http o que haya que generar una respuesta http. Se limitan a la lógica funcional.

Ubicados en la carpeta `services`

Son invocados desde la capa de controladores, y un componente de servicio puede apoyarse en otro componente de servicio para realizar la lógica funcional. Así el código queda bien organizado, se evita duplicar código.

# Ejemplos de algunas funcionalidades ejecutando en servidor

## Acceso a variables de entorno

Las variables de entorno son parejas nombre-texto que existen en el sistema operativo y permiten usarlas para parametrizar y configurar el funcionamiento de una aplicación.

Por ejemplo:

- configurar los datos de conexión a las bases de datos
- configurar las url's de servicios remotos con los que se necesite comunicar
- configurar el nivel de log para generar más detalle en desarrollo pero no en producción

### Consulta de variables de entorno existentes

En terminal `linux` ejecutando el comando `env`

```bash
 ~  env
LANGUAGE=en_US:
LANG=en_US.UTF-8
M2_HOME=/opt/maven
LC_TELEPHONE=es_ES.UTF-8
...
```

Para consultar el valor de una variable de entorno concreta utilizamos `echo $<variable>`

```bash
 ~  echo $TERM
xterm-256color
```

### Declarar una variable de entorno

Se declaran usando el comando `export <variable> = <texto>`

```bash
 ~  export DB_URI="jdbc:mysql://localhost:3306/"
 ~  export DB_USER="root"
 ~  export DB_PASSWORD="45678913";
```

### Lectura de variables de entorno desde script javascript

Están accesibles a través de la expresión `process.env.<nombre_variable>`

Ejemplo: Leer la variable en la que configuramos la url de la base de datos. Suponiendo que la hemos configurado en una variable de entorno llamada `DB_URI`.

```javascript
const dbUri = process.env.DB_URI?.trim() || '';
```

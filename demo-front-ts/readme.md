# Proyecto PRO

## Vite

<https://es.vite.dev/>

### Typescript

<https://www.typescriptlang.org/>

Incluido y configurado en la instalación

### Importaciones: CSS y SVG

- CSS
- SVG

### Elementos iniciales

- root
  - .gitignore
  - tsconfig.json
  - package.json
  - readme.md
  - index.html
- src
  - main.ts
  - vite-env.d.ts
- public
  - favicon.svg

## Editorconfig / prettier

- .editorconfig
- package.json - prettier (¿instalación local?)

## Linter

<https://eslint.org/>

- ESLint

## Typescript - Configuración

- `tsconfig.json`

Se puede definir el uso de alias para las rutas de los archivos.

```json
{
  "compilerOptions": {
    /* valores creados al instalar vite */

    /* Paths */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

- `vite.config.ts`

Hay que configurar vite para que reconozca los alias definidos en el archivo de configuración de Typescript.

```ts
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

Más información <https://stackoverflow.com/questions/68241263/absolute-path-not-working-in-vite-project-react-ts>

Una alternativa era utilizar el plugin `vite-plugin-alias` que permite definir los alias en el archivo de configuración de Vite.

En este momento parece que no funciona con la versión actual de Vite (6.0.x).

## Testing

<https://vitest.dev/>

- Vitest

### Configuración

Hay que configurar vite para que reconozca las funciones de los tests como variables globales y no tener que añadir imports en cada test. Además hay que configurara typeScript para que no de errores de tipos.

- `vite.config.ts`

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.test.ts'],
    globals: true,
  },
});
```

- `tsconfig.json`

```json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

Da problemas de actualización si la carpeta del proyecto no está como root en el editor desde el que se abre la terminal para ejecutar el comando.

## MPA (Multi Page Application)

- `vite.config.ts`

```ts
 build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        main: resolve(__dirname, 'page1/index.html'),
        main: resolve(__dirname, 'page2/index.html'),
      },
    },
  }
```

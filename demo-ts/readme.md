# Proyecto con Node y TS

Podría ser un backend o solo TS
No hay front

- Package.json: `npm init -y`
- .editorconfig
- prettier: `npm i -D prettier`
- en package.json: `"prettier": {"singleQuote": true}`

## Typescript

<https://www.typescriptlang.org/>

Instalación y configuración

`npm i -D typescript`
`npx tsc --init`

Reviso los valores de tsconfig.ts

```json
"rootDir": "./src"
"outDir": "./dist"
```

Añado el script en package.json

`"build": "tsc -w"`

## Linter

<https://eslint.org/>

- ESLint

`npm init @eslint/config@latest`

Añado el script en package.json

`"lint": "eslint ."`

## Testing

<https://vitest.dev/>

- Vitest

`npm install -D vitest`

Modifico el script en package.json

`"test": "vitest"`

### Configuración

Hay que configurar vite para que reconozca las funciones de los tests como variables globales y no tener que añadir imports en cada test. Además hay que configurara typeScript para que no de errores de tipos.

- `vite.config.js`

```ts
/// <reference types="vitest" />
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

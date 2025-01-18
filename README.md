# Prueba tecnica para Identidadtech (BACKEND)

## Prerequisitos

- Bun
- SQLite

## Para instalar dependencias

```sh
bun i
```

## Para ejecutar entorno de desarrollo

```sh
bun run seed
bun run dev
```

abrir: <http://localhost:8888>

## Para ejecutar test

```sh
bun run seed
bun test
```

## Para desplegar

```sh
bun run build
```

Ejecutar en servidor:

```sh
bun dist/_worker.js
```

O usando Wrangler para Github pages con la cuenta configurada:

```sh
bunx wrangler pages deploy dist
```

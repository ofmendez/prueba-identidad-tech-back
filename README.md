# Prueba tecnica para Identidadtech (BACKEND)

## Publicado en

[identidad-tech-front.pages.dev](https://identidad-tech-front.pages.dev/)

Archivo .csv para subir:
[devices.csv](https://raw.githubusercontent.com/ofmendez/prueba-identidad-tech-back/refs/heads/main/src/test/devices.csv)

## Desarrollo

### Prerequisitos

- Bun
- SQLite

### Para instalar dependencias

```sh
bun i
```

### Para ejecutar entorno de desarrollo

```sh
bun run seed-local
bun run dev
```

abrir: <http://localhost:8888>

### Para ejecutar test

```sh
bun run seed-local
bun test
```

### Para desplegar

```sh
bun run seed
bun run build
```

Ejecutar en servidor:

```sh
bun dist/_worker.js
```

Para usar PM2 con Bun:

```sh
pm2 start --interpreter bun ./dist/_worker.js
```

O usando Wrangler para Github workers con la cuenta configurada:

```sh
bunx wrangler workers deploy dist
```

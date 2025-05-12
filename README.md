# Control d'AutoCaravanes — Desplegament amb Docker (SQLite)

Aquest projecte és una aplicació Next.js amb Prisma que utilitza SQLite com a base de dades. La seva principal funció és un sistema lleuger i fàcil de fer servir per controlar el temps d'estacionat dels vehicles al parquing destinat a autocaravanes. El limit està fixat en 72h amb un minim de 24h entre registres per a la mateixa matrícula. A continuació tens les instruccions per desplegar-lo amb Docker.

## Requisits

* Docker
* Docker Compose

## Configuració

1. Crea un fitxer `.env` a l'arrel del projecte amb aquesta línia:

   ```env
   DATABASE_URL="sqlite://johndoe:randompassword@localhost:5432/mydb?schema=public"
   ```

## Com executar amb Docker

1. Compila i aixeca el contenidor:

   ```bash
   docker-compose up -d
   ```

2. L'aplicació estarà disponible a [http://localhost:3200](http://localhost:3200).

## Altres comandes útils

* Regenerar el client Prisma (si canvies l'esquema):

  ```bash
  docker-compose exec web npx prisma generate
  ```

* Aturar l'aplicació:

  ```bash
  docker-compose down
  ```

## Notes

* SQLite desa la base de dades en un fitxer local (`dev.db`).
* Ideal per desenvolupament, però no es recomana per a entorns de producció si aquest és molt gran.

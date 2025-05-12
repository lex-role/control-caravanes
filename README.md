# Control Caravanes — Desplegament amb Docker (SQLite)

Aquest projecte és una aplicació Next.js amb Prisma que utilitza SQLite com a base de dades. A continuació tens les instruccions per desplegar-lo amb Docker.

## Requisits

* Docker
* Docker Compose

## Configuració

1. Crea un fitxer `.env` a l'arrel del projecte amb aquesta línia:

   ```env
   DATABASE_URL="file:./dev.db"
   ```

2. Assegura't que al fitxer `prisma/schema.prisma` el `provider` sigui `sqlite`:

   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

## Com executar amb Docker

1. Compila i aixeca el contenidor:

   ```bash
   docker-compose up --build
   ```

2. Aplica les migracions de Prisma (només la primera vegada o si n'hi ha de noves):

   ```bash
   docker-compose exec web npx prisma migrate dev
   ```

3. L'aplicació estarà disponible a [http://localhost:3200](http://localhost:3200).

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
* Ideal per desenvolupament, però no es recomana per a entorns de producció.
* Pots afegir `dev.db` al `.gitignore` si no vols incloure'l al repositori.

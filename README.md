# Control Caravanes — Desplegament amb Docker

Aquest projecte és una aplicació Next.js amb Prisma i una base de dades MySQL. A continuació tens les instruccions per desplegar-lo amb Docker.

## Requisits

- Docker
- Docker Compose

## Configuració

1. Crea un fitxer `.env` a l'arrel del projecte amb el contingut següent (potser ja el tens, revisa-ho):

    ```env
    DATABASE_URL="mysql://user:password@db:3306/nom_base_de_dades"
    DATABASE_NAME=nom_base_de_dades
    DATABASE_USER=user
    DATABASE_PASSWORD=password
    DATABASE_ROOT_PASSWORD=rootpassword
    ```

2. Modifica les variables amb els teus valors reals.

## Com executar amb Docker

1. Compila i aixeca els contenidors:

    ```bash
    docker-compose up --build
    ```

2. Aplica les migracions de Prisma:

    ```bash
    docker-compose exec web npx prisma migrate deploy
    ```

3. L'aplicació estarà disponible a [http://localhost:3000](http://localhost:3000).

## Altres comandes útils

- Accedir a la base de dades:

    ```bash
    docker-compose exec db mysql -u user -p
    ```

- Aturar els serveis:

    ```bash
    docker-compose down
    ```

## Notes

- El volum `db_data` persisteix les dades de MySQL.
- Qualsevol canvi de codi es reflecteix gràcies al muntatge del directori local amb `volumes`.

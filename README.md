## Build Docker
After starting Docker Desktop or Docker on your PC, run the belows commands: 
```
$ npm install
$ docker compose build
$ docker compose up
```

## Migrate database
```
$ cd src/app/
$ npx sequelize db:migrate --url 'postgres://postgres:postgres@localhost:5434/postgres'
```
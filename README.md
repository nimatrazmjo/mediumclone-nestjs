## Description

Medium clone using [Nest](https://github.com/nestjs/nest)

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

### Migrations

```bash
# drop database
$ yarn db:drop

# create migration
$ yarn db:create src/migrations/CreateTags

# run migration

$ yarn db:migrate
```
## License

Nest is [MIT licensed](LICENSE).

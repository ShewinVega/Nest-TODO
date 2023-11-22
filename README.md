<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[TODO] project. Api that has user crud and allows to create task per user and then show them in accordance with the user logged.

## Installation

```bash
$ npm install
```

## Prisma Initialization
```bash
$ npx prisma init
```

## Docker Inialization
###### Pre-requisites
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- You need to be secure about all your environment variables. Fill the variables in order to have the correct configuration
```bash
 docker compose up
```

## Running the app

```bash

# watch mode
$ npm run start:dev

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

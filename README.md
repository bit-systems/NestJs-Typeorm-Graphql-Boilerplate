<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Features

- [x] Graph QL Support.
- [x] Database. Support [TypeORM](https://www.npmjs.com/package/typeorm).
- [x] Private API's using Authentication Strategy.
- [x] Public API's.
- [x] Sign in and sign up via email/password.
- [x] Environment variable validation using [zod](https://zod.dev/).
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Deployment via AWS (build spec included).
- [ ] Role Based Access.
- [ ] upload Imaged to aws S3.
- [ ] Social sign in (Apple, Facebook, Google, Twitter).

- [ ] Docker.

- [ ] Many more to come...

## Requirements

Please feel free to raise an issue, if you feel something is not right or if you need any feature

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

## License

[MIT licensed](LICENSE).

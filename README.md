# Air Apple Cart Backend

This is an NX powered respository with microservice architecture.

## Recommendations

- Use [pnpm](https://pnpm.io/installation) as package manager
- Use "kebab-case" when naming a file e.g user-account
- Append the file name with valid entity e.g auth.controller.ts, profile.service.ts
- Use PascalCase while naming class, enum, and dto
- Use camelCase for functions and variables
- Use nx console extension to run and build the project
- Add success response in swagger API enpoints

## Guide to running the project

Install [pnpm](https://pnpm.io/installation) and run

```bash
  pnpm install
```

Generate prisma client

```bash
  pnpm dlx prisma generate
```

Run docker for rabbitmq and mongodb

```bash
  docker compose up
```

Finally use nx console to run the project

## Pre-Commit Hooks

- Prettier
- Lint (Unused variables and typescript errors will stop you from commiting)

## Tech Stack

**Architecture:** Microservice ([nx](https://nx.dev))

**Server:** Nestjs, Mongodb, Prisma, RabbitMQ, Redis

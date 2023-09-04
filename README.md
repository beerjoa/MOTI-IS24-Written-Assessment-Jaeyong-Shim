# MOTI, Person Relations Service

<img alt="Docker" src="https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=Docker&logoColor=white" />
<img alt="Node.js" src="https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=Node.js&logoColor=white" />
<img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=TypeScript&logoColor=white" />
<img alt="PostgreSQL" src="https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=PostgreSQL&logoColor=white" />
<img alt="Git" src="https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=Git&logoColor=white" />

Req#95370 – ISL 24R – Full Stack Developer \
Written Assignment by Jaeyong Shim

# Table of Contents

- [Development Stack](#development-stack)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Build](#build)
  - [Run](#run)
  - [Check](#check)
- [License](#license)

## Development Stack

- Docker Engine: 20.10.17
- Docker Compose: 2.7.0
- Node.js: 18.17.1
- IDE: Visual Studio Code
- Version Control: Git

## Structure

```bash
# root
./
├── backend             # backend service
├── database            # database init sql
├── docker              # Dockerfiles
├── docker-compose.yml  # docker compose file
├── frontend            # frontend service
├── LICENSE.md
└── README.md

## backend
./backend/src
├── config              # config
│  ├── db.config.ts
│  ├── db.migration.config.ts
│  └── env              # development, stage
├── entities            # entities
│  ├── index.ts
│  ├── Persons.ts
│  └── Relationships.ts
├── middleware          # middlewares
├── migrations          # database migrations in local
├── persons             # person module (DTO, Service, Controller)
├── relationships       # relationship module (DTO, Service, Controller)
├── utils               # utils
├── app.module.ts       # app module
└── main.ts             # main file

## frontend
./frontend/src
├── components
│  ├── Flow.module.css
│  ├── Flow.tsx         # Graph component
│  ├── PersonNode.tsx   # Person node component
│  └── RelationEdge.tsx # Relation edge component
├── models
│  ├── Person.ts        # Person model
│  └── index.ts         # models index
├── pages
│  └── NotFound.tsx
├── services
│  └── ApiService.ts    # API service
├── App.module.css
├── index.css
├── http-commons.ts     # axios instance
├── setupTests.ts
├── vite-env.d.ts
├── App.test.tsx
├── App.tsx
└── main.tsx

## database
./database
├── init.sql            # init sql
└── db_diagram.png         # database diagram

## docker
./docker
├── backend.Dockerfile
├── database.Dockerfile
└── frontend.Dockerfile
```

## Getting Started

This is an example of how to set up the project.

### Requirements

It is packaged with Docker Compose, so you need to install the software below.

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Build

```bash
# build the services
$ docker compose build
```

### Run

```bash
# run the services in the background
$ docker compose up -d

# if you want to see the logs
$ docker compose logs -f

# you can also run specific service with the service name
$ docker compose up -d <service name> # e.g. docker compose up -d backend

```

### Check

```bash
# check the status of the services
$ docker compose ps

# binded hosts and ports
# backend: http://localhost:43000
# swagger: http://localhost:43000/api-docs
# frontend: http://localhost:44000
# database: http://localhost:45432
```

# License

- [MIT licensed](LICENSE)

# Meetup API task.

## Used technologies

* NestJS
* TypeScript
* PrismaORM
* PostgreSQL
* PassportJS
* SwaggerUI
* Joi validator
* Faker
* Docker

## Get started

#### Develop the nest app
run
```
yarn
npx prisma generate
yarn start:dev
```

to seed some data run
```
yarn prisma:seed:dev
```

to deploy migrations
```
yarn prisma:migrate:dev
```
#### Docker

Open console in root project folder and run
```
docker compose up
# or detached
docker compose up -d
```

or just check my  

### deployment

Google Cloud Run deployment [[click]](https://meetups-api-tgrtqe7bza-ey.a.run.app/api#/).

Database server runs on [Render.com](https://render.com/) dedicated PostgreSQL server.

### DB Structure

| Role        (enum) |
| -------------------|
| User               |
| Organizer          |

| User               |
| -------------------|
| id                 |
| email              |
| passwordHashed     |
| firstName          |
| lastName           |
| passwordHashed     |
| refreshToken       |
| userRole           |

| UserOnMeetup       |
| -------------------|
| userId             |
| meetupId           |

| Meetup             |
| -------------------|
| id                 |
| meetupName         |
| meetupDescription  |
| meetingTime        |
| meetingPlaceId     |
| meetupCreatorId    |

| TagOnMeetup        |
| -------------------|
| tagId              |
| meetupId           |

| Tag                |
| -------------------|
| id                 |
| tagName            |

| Place              |
| -------------------|
| id                 |
| city               |
| street             |
| building           |
| room               |

### Project folder structure
```sh
├── env
├── prisma
│   └── migrations
│       ├── 20230620090426_initial_migration
│       ├── 20230620100748_roles_enum
│       ├── 20230622072402_added_creator_id
│       ├── 20230622102246_added_cascade_deletion
│       ├── 20230625123411_add_cascade_del_for_users
│       └── 20230625135401_cascade_deletions
└── src
    ├── common
    │   ├── decorators
    │   ├── enum
    │   ├── filters
    │   ├── guard
    │   ├── interceptors
    │   ├── jwt
    │   ├── pipes
    │   ├── swagger
    │   └── types
    ├── config
    └── modules
        ├── auth
        │   ├── dto
        │   └── repository
        ├── meetups
        │   ├── dto
        │   └── repository
        ├── places
        │   ├── dto
        │   └── repository
        ├── prisma
        ├── tags
        │   ├── dto
        │   └── repository
        └── users
            ├── dto
            └── repository
```
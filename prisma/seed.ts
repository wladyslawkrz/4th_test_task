import { Prisma, PrismaClient, Role } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as argon from 'argon2';

const prisma = new PrismaClient();

const users: Prisma.UserCreateInput[] = [
  {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    userRole: Role.User,
    passwordHashed: 'password',
  },
  {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    userRole: Role.Organizer,
    passwordHashed: 'password',
  },
  {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    userRole: Role.User,
    passwordHashed: 'password',
  },
];

const tags: Prisma.TagCreateInput[] = [
  {
    tagName: `#${faker.company.buzzNoun()}`,
  },
  {
    tagName: `#${faker.company.buzzNoun()}`,
  },
  {
    tagName: `#${faker.company.buzzNoun()}`,
  },
  {
    tagName: `#${faker.company.buzzNoun()}`,
  },
];

const places: Prisma.PlaceCreateInput[] = [
  {
    city: faker.location.city(),
    street: faker.location.street(),
    building: String(faker.location.buildingNumber()),
    room: Math.ceil(Math.random() * 100),
  },
  {
    city: faker.location.city(),
    street: faker.location.street(),
    building: String(faker.location.buildingNumber()),
    room: Math.ceil(Math.random() * 100),
  },
  {
    city: faker.location.city(),
    street: faker.location.street(),
    building: String(faker.location.buildingNumber()),
    room: Math.ceil(Math.random() * 100),
  },
];

const hashPasswords = async (password: string) => {
  return await argon.hash(password);
};

const main = async (): Promise<void> => {
  for (const user of users) {
    user.passwordHashed = await hashPasswords(user.passwordHashed);
  }

  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  for (const tag of tags) {
    await prisma.tag.create({ data: tag });
  }

  for (const place of places) {
    await prisma.place.create({ data: place });
  }

  console.log('Seeding of mock users finished');
};

main()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect;
  });

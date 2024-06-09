import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function completeTable() {
  const users = [];

  for (let i = 0; i < 1000000; i++) {
    users.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int({ min: 18, max: 80 }),
      gender: faker.helpers.arrayElement(['male', 'female']),
      hasProblems: faker.datatype.boolean(),
    });

    if (i % 10000 === 0) {
      console.log(`Generated ${i} users`);
    }
  }

  await prisma.user.createMany({ data: users });
}

completeTable()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

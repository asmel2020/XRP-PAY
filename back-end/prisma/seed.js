const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
  await prisma.user.create({
    data: {
      email: 'example@gmail.com',
      password: bcrypt.hashSync('123456789Api.', 10),
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

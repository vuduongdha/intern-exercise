import { Gender, PrismaClient, Status } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = ['ADMIN', 'STAFF'];
  const roleData = await prisma.role.findMany({
    where: {
      name: {
        in: roles,
      },
    },
  });
  const roleInput = roleData.map((role) => {
    return {
      role: {
        connect: {
          id: role.id,
        },
      },
    };
  });
  console.log(roleInput);

  const data = {
    firstName: 'Anh',
    lastName: 'Nguyen',
    email: 'namvietanh2000@gmail.com',
    dateOfBirth: new Date('2002-10-19'),
    isEmailVerified: true,
    gender: <Gender>'MALE',
    status: <Status>'ACTIVE',
  };

  const result = await prisma.$queryRaw`SELECT * FROM User`;
  // const user = await prisma.user.create({
  //   data: {
  //     ...data,
  //     roles: {
  //       create: roleInput,
  //     },
  //   },
  //   include: {
  //     roles: true,
  //   },
  // });
  console.log(result);
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

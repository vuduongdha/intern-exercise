import { Gender, PrismaClient, Status } from '@prisma/client';

const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');

async function main() {
    // const allUsers = await prisma.user.findMany();
    const uuid = uuidv4();
    const user = await prisma.user.create({
        data: {
            id: uuid.toString(),
            firstName: 'Lara',
            lastName: 'Fabian',
            address: 'Belgium',
            dateOfBirth: new Date(1970, 1, 9),
            email: 'lara@gmail.com',
            isEmailVerified: true,
            phone: '0132849523',
            gender: Gender.FEMALE,
            status: Status.INACTIVE
        },
    })
    console.log(user);
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

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function mainFixture() {
    const user1 = await prisma.user.create({
        data: {
            email: 'user1@example.com',
            password: 'password123'
        }
    });

    const user2 = await prisma.user.create({
        data: {
            email: 'user2@example.com',
            password: 'password123'
        }
    });
    console.log('fixtures insérées !!');   
}

mainFixture();
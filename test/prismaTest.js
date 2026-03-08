import { PrismaClient } from '../generated/prisma_client/client.ts';

const prisma = new PrismaClient({accelerateUrl: process.env.DATABASE_URL});

const id = process.argv[2];

const fonctionDeTest = async () => {
    try {
        const results = await prisma.user.findMany({ where: { familyId: parseInt(id) } });
        console.log(results);        
    } catch (error) {
        console.error('Errur prisma', error)
    } finally {
        await prisma.$disconnect();
    }
};

fonctionDeTest();
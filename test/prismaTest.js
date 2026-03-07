const { PrismaClient } = require('./generated/prisma_client/client');

const prisma = new PrismaClient();

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
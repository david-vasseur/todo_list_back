import { PrismaClient } from '../generated/prisma_client/client.ts';

const prisma = new PrismaClient({accelerateUrl: process.env.DATABASE_URL});

export default prisma;
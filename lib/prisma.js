import { PrismaClient } from '../generated/prisma_client/client.ts';
import { PrismaMysql } from "@prisma/adapter-mysql";

const adapter = new PrismaMysql({
  url: process.env.DATABASE_URL
})

const prisma = new PrismaClient({adapter});

export default prisma;
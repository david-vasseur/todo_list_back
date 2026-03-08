import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client.ts";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT) || 3306,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: false,
  connectionLimit: 5,
  allowPublicKeyRetrieval: true,
  logger: {
    error: (error) => console.error('PrismaAdapterError', error),
    warning: (info) => console.warn('PrismaAdapterWarning', info),
    network: (info) => console.log('PrismaAdapterNetwork', info),
  },
});
const prisma = new PrismaClient({ adapter });

export default prisma;

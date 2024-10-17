import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createFamilyRepo = async (data) => {
    return await prisma.family.create({ data });
};

export const getHashRepo = async (id) => {
    return await prisma.family.findUnique({ 
        where: { id },
        select: { hash }
     });
};

export const getIdRepo = async (hash) => {
    return await prisma.family.findUnique({
        where: { hash },
        select: { id }
    });
};


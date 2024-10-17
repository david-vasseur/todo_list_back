import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTreeRepo = async (data) => {
    return await prisma.tree.create({ data });
};

export const updateTreeRepo = async (id, name) => {
    return await prisma.tree.update({
        where: { id: id },
        data: { name: name }
    })
};

export const deleteTreeRepo = async (id) => {
    return await prisma.tree.delete({ where: { id } })
};

export const getTreeRepo = async (id) => {
    return await prisma.tree.findUnique({ where: { id } });
};

export const getAllTreeByFamilyIdRepo = async (familyId) => {
    try {
        return await prisma.tree.findMany({ where: { familyId } });
    } catch (error) {
        console.error("erreur de connection a la bdd");
    }  
};
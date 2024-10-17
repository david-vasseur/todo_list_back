import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (data) => {
    return await prisma.user.create({ data });
};

export const getUserByEmail = async (email) => {
    return await prisma.user.findUnique({ where: { email } })
};

export const getUserById = async (id) => {
    const user = await prisma.user.findUnique({ 
        where: { id },
        select: {
            email: true,
            firstName: true,
            name: true,
            familyId: true,
            family: {
                select: {
                    name:true,
                    hash:true,
                    ownerId:true,
                    type:true
                }
            }
        }
     });
     if (user.family) {
        if (user.family.ownerId === id) {
            user.family.isOwner = true;
         } else {
            user.family.isOwner = false;
         }
     }
     return user;
};

export const getAllUsersByFamilyIdRepo = async (familyId) => {
    return await prisma.user.findMany({ where: { familyId } })
};

export const updatePasswordRepo = async (userId, newPassword) => {
    return await prisma.user.update({
        where: { id: userId },
        data: { password: newPassword }
    })
};

export const updateName = async (newname, userId) => {
    return await prisma.user.update({
        where: { id: userId },
        data: { name: newname }
    })
};

export const addFamilyRepo = async (id, familyId) => {
    return await prisma.user.update({
        where: { id },
        data: { familyId }
    })
};
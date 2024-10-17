import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTaskRepo = async (data) => {
    return await prisma.task.create({ data });
};

export const getAllTasksRepo = async (treeId) => {
    return await prisma.task.findMany({ 
        where: { treeId },
        orderBy: { id: 'desc' } 
    });
};

export const deleteTaskRepo = async (id) => {
    return await prisma.task.delete({ where: { id } });
};

export const updateTaskRepo = async (id, content) => {
    return await prisma.task.update({ 
        where: { id },
        data: { content }
     });
};

export const deleteAllTasksRepo = async (treeId) => {
    return await prisma.task.deleteMany({ where: { treeId } })
};
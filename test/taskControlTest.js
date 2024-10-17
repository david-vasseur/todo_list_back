import { PrismaClient } from "@prisma/client";
import { createTaskControl } from "../controllers/taskController.js";
import { createTask, deleteTask, updateTask } from "../services/taskService.js";

const prisma = new PrismaClient();

const id = parseInt(process.argv[2]);
const content = process.argv[3];

export const createTest = async () => {
    try {
        const result = await createTask(content, parseInt(treeId));
        console.log('Ajout de la tache', result);
    } catch (error) {
        console.error("une erreur est survenue", error)
    }
};

export const deleteTaskTest = async () => {
    try {
        const result = await deleteTask(parseInt(id));
        console.log("la tache a bien été effacé.");
        
    } catch (error) {
        console.error("une erreur est survenue", error)
    }
};

export const updateTaskTest = async () => {
    try {
        const result = await updateTask(parseInt(id), content);
        console.log("mise a jour effectuée", result);
        
    } catch (error) {
        console.error("une erreur est survenue", error)
    }
}

export const deleteAllTasks = async () => {
    try {
        await prisma.task.deleteMany({ where: { treeId: id } });
        console.log("effacement reussi");
        
    } catch (error) {
        console.error("une erreur est survenue", error)
    }
}

deleteAllTasks();
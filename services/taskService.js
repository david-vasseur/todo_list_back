import { createTaskRepo, deleteTaskRepo, getAllTasksRepo, updateTaskRepo } from "../repositories/taskRepository.js";

export const createTask = async (content, treeId) => {
    const data = {
        content,
        treeId
    };

    try {
        const result = await createTaskRepo(data);
        return result;
    } catch (error) {
        return { error: 'Erreur du service !', details: error.message };
    }
};

export const getAllTasks = async (treeId) => {
    try {
        const result = await getAllTasksRepo(treeId);
        return result;
    } catch (error) {
        return { error: 'Erreur du service !', details: error.message };
    }
};

export const deleteTask = async (id) => {
    try {
        const result = await deleteTaskRepo(id);
        return result;
    } catch (error) {
        return { error: 'Erreur du service !', details: error.message };
    }
};

export const updateTask = async (id, content) => {
    try {
        const result = await updateTaskRepo(id, content);
        return result;
    } catch (error) {
        return { error: 'Erreur du service !', details: error.message };
    }
};
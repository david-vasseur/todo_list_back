import { io } from "../server.js";
import { createTask, deleteTask, getAllTasks, updateTask } from "../services/taskService.js";

export const createTaskControl = async (req, res) => {
    const { content, treeId } = req.body;
    console.log(req.body);    
    try {
        const result = await createTask(content, parseInt(treeId));
        io.emit('taskAdded', result);
        res.status(201).json({ message: "La tache a bien été ajouté.", data: result });
    } catch (error) {
        return res.status(500).json({ message: "Une erreur est survenue." });
    }
};

export const getAllTasksControl = async (req, res) => {
    const { treeId } = req.params;

    try {
        const result = await getAllTasks(parseInt(treeId));
        res.status(200).json({ message: "Vous avez bien recupéré les taches", data: result });
    } catch (error) {
        return res.status(500).json({ message: "Une erreur est survenue." });
    }
};

export const deleteTaskControl = async (req, res) => {
    const { id } = req.body;

    try {
        const result = await deleteTask(parseInt(id));
        io.emit('taskDeleted', result);
        res.status(200).json({ message: "La tache a bien été supprimé." });
    } catch (error) {
        return res.status(500).json({ message: "Une erreur est survenue." });
    }
};

export const updateTaskControl = async (req, res) => {
    const { id, content } = req.body;
    console.log(req.body);
    
    try {
        const result = await updateTask(parseInt(id), content);
        console.log(result);        
        io.emit('taskUpdated', result);
        res.status(200).json({ message: "La tache a bien été modifié." });
    } catch (error) {
        return res.status(500).json({ message: "Une erreur est survenue." });
    }
};
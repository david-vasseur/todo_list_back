import { Router } from "express";
import { createTaskControl, deleteTaskControl, getAllTasksControl, updateTaskControl } from "../controllers/taskController.js";

const router = Router();

router.post('/add', createTaskControl);
router.delete('/delete', deleteTaskControl);
router.put('/update', updateTaskControl);
router.get('/:treeId', getAllTasksControl);

export default router;
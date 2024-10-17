import { Router } from "express";
import { createTreeControl, deleteTreeControl, getAllTreeControl, getTreeControl, updateTreeControl } from "../controllers/treeController.js";
import { validateTreeName } from "../middleware/validationMiddleware.js";
import { csrfMiddleware } from "../middleware/csrfMiddleware.js";
import { authenticateMiddleware } from "../middleware/authenticateMiddleware.js";

const router = Router();

router.post('/add', createTreeControl);
router.delete('/delete/:id', deleteTreeControl);
router.put('/update', updateTreeControl);
router.get('/all/:familyId', getAllTreeControl);
router.get('/one/:id', getTreeControl);

export default router;
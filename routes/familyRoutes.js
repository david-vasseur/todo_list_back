import { Router } from "express";
import { addFamilyControl, createFamilyControl, getHashControl } from "../controllers/familyController.js";

const router = Router();

router.post('/create', createFamilyControl);
router.post('/update', addFamilyControl);
router.get('/hash/:id', getHashControl);

export default router;
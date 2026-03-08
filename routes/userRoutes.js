import { Router } from 'express';
import {
    authenticateUser,
    getAllUsersByFamilyControl,
    getUser,
    registerUser,
    updatePassword
} from '../controllers/userController.js';
import { authenticateMiddleware } from '../middleware/authenticateMiddleware.js';
import { signValidation } from '../middleware/validationMiddleware.js';

const router = Router();

router.post('/sign', signValidation, registerUser);
router.post('/login', authenticateUser);
router.get('/user', authenticateMiddleware, getUser);
router.post('/updatePassword', authenticateMiddleware, updatePassword);
router.get('/:id', authenticateMiddleware, getAllUsersByFamilyControl);

export default router;

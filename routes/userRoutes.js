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
import { csrfMiddleware } from '../middleware/csrfMiddleware.js';

const router = Router();

router.post('/sign',csrfMiddleware, signValidation, registerUser);
router.post('/login',csrfMiddleware, authenticateUser);
router.get('/user', authenticateMiddleware, getUser);
router.post('/updatePassword', authenticateMiddleware, csrfMiddleware, updatePassword);
router.get('/:id', csrfMiddleware, authenticateMiddleware, getAllUsersByFamilyControl);

export default router;

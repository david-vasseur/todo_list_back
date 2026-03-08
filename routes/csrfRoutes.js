import { Router } from 'express';
import csurf from 'csurf';


const router = Router();
const csrfProtection = csurf();

// ENDPOINT POUR OBTENIR UN TOKEN CSRF //

router.get('/', csrfProtection, (req, res) => {
    console.log('CSRF failed:', err);
    res.json({ csrfToken: req.csrfToken() });
});

export default router;
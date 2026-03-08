import { Router } from 'express';
import csurf from 'csurf';


const router = Router();
const csrfProtection = csurf();

// ENDPOINT POUR OBTENIR UN TOKEN CSRF //

router.get('/', csrfProtection, (req, res) => {
    const token = req.csrfToken();
    console.log('✅ Route /csrfToken atteinte, token généré:', token);
    res.json({ csrfToken: token });
});

export default router;
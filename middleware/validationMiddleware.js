import { body, validationResult } from 'express-validator';

 export const signValidation = [
    body('email')
        .isEmail().withMessage('Veuillez fournir une adresse email valide.')
        .normalizeEmail(),
    body('name')
        .isString().withMessage('Veuillez entrer votre nom')
        .trim()
        .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/).withMessage('Le nom contient des caractères non valides')
        .escape(),
    body('firstName')
        .isString().withMessage('Veuillez entrer votre prénom')
        .trim()
        .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/).withMessage('Le nom contient des caractères non valides')
        .escape(),  
    body('password')
        .isLength({ min: 9 }).withMessage('Le mot de passe doit contenir au moins 9 caractères.')
        .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une majuscule')
        .trim() 
        .escape(), 
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const validateTreeName = [
    body('name')
        .isString().withMessage('Veuillez entrer le nom de l\'arbre.')
        .trim()
        .matches(/^[a-zA-ZÀ-ÿ0-9\s'-.!?]+$/).withMessage('Le nom de l\'arbre contient des caractères non valides.')
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
import csurf from 'csurf';

const csrfProtection = csurf({
    cookie: false, 
});

export const csrfMiddleware = (req, res, next) => {
    csrfProtection(req, res, (err) => {
        if (err) {
            if (err.code === 'EBADCSRFTOKEN') {
                return res.status(403).json({ message: 'Token CSRF invalide' });
            }
            return next(err);
        }
        next();
    });
};



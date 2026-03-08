import csurf from 'csurf';

const csrfProtection = csurf({
    cookie: false, 
});

export const csrfMiddleware = (req, res, next) => {
    csrfProtection(req, res, (err) => {
        if (err) {
            if (err.code === 'EBADCSRFTOKEN') {
                console.log('CSRF failed:', err);
                return res.status(403).json({ message: 'Token CSRF invalide' });
            }
            return next(err);
        }

        // ✅ Ici, tout est OK, on peut logger le token pour debug
        console.log('CSRF passed, token for this request:', req.csrfToken?.());

        next();
    });
};


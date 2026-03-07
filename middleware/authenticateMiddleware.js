import jwt from 'jsonwebtoken';

export const authenticateMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Accès non authorisé" })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        const csrfToken = req.headers['x-csrf-token'];
        if (!csrfToken || csrfToken !== req.csrfToken()) {
            return res.status(403).json({ message: "Token CSRF invalide" });
        }
        next()
    } catch (error) {
        return res.status(403).json({ message: "Token invalide" });
    }
}
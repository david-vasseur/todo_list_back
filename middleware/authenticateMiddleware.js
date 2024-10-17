import jwt from 'jsonwebtoken';

export const authenticateMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Accès non authorisé" })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next()
    } catch (error) {
        return res.status(403).json({ message: "Token invalide" });
    }
}
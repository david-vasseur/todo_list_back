import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import treeRoutes from './routes/treeRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import familyRoutes from './routes/familyRoutes.js';
import csrfRoutes from './routes/csrfRoutes.js';
import { sessionMiddleware } from './middleware/sessionMiddleware.js';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

// LECTURE DANS TOUTE L'APPLICATION DU .ENV //

dotenv.config();

// INITIALISATION //

const PORT = 8080;
const app = express();
const usersOnline = {};

// CREATION D'UN SERVEUR HTTP PLUS FLEXIBLE POUR GERE WEBSOCKET //

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000', 
        methods: ['GET', 'POST', 'DELETE']
    }
});

app.use(express.json());

// MIDDLEWARE DE SESSION //

app.use(sessionMiddleware);

// CORS //

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// ROUTES //

app.use('/api/users', userRoutes);
app.use('/api/tree', treeRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/family', familyRoutes);
app.use('/csrfToken', csrfRoutes);

// GESTION CONNEXION SOCKET.IO //

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    const userFirstName = socket.handshake.query.userFirstName;
    usersOnline[userId, userFirstName];
    console.log(`Utilisateur ${userId} ${userFirstName} est connecté`);

    socket.on('disconnect', () => {
        console.log("Un utilisateur s'est déconnecté");
    });
});

// LANCEMENT //

httpServer.listen(PORT, () => {
    console.log(`le serveur est lancé sur http://localhost:${PORT}`); 
});

export { io };
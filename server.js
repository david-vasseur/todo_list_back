import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import treeRoutes from './routes/treeRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import familyRoutes from './routes/familyRoutes.js';
import session from 'express-session';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';

// LECTURE DANS TOUTE L'APPLICATION DU .ENV //

dotenv.config();

// INITIALISATION //

const PORT = 8080;
const app = express();
const usersOnline = {};

// TRUST PROXY POUR LES X-FORWARD NGINX //

app.set('trust proxy', 1);

// GESTION DES COOKIES //

app.use(cookieParser());

// CREATION D'UN SERVEUR HTTP PLUS FLEXIBLE POUR GERER WEBSOCKET //

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ['http://ez-task:4002'],
        credentials: true,
        methods: ['GET', 'POST', 'DELETE', 'PUT']
    }
});

// API BASE SUR DU FULL JSON //

app.use(express.json());

// CORS //

app.use(cors());

app.options('*', app);

// MIDDLEWARE DE SESSION //

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly:true,
        sameSite: 'none',
        domain: '.ez-task.fr'
    }
}));

// ROUTES //


app.use('/api/users', userRoutes);
app.use('/api/tree', treeRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/family', familyRoutes);

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
    console.log(`le serveur est lancé sur le port ${PORT}`);
});

export { io };
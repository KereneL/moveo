const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth.routes');
const songsRoutes = require('./routes/songs.routes');
const jamRoutes = require('./routes/jam.routes');
const socketIO = require('socket.io');
const { socketHandler } = require('./socket/socketHandler');

// Start Express
const app = express()

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});
app.use(express.static(path.join(__dirname, '../public')));

// Routing
app.use("/auth", authRoutes);
app.use("/songs", songsRoutes)
app.use("/jam", jamRoutes)


// Start the HTTP server
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    }
});

// Integrate JWT authentication with Socket.IO
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    jwt.verify(token, 'TOKEN', (error, decoded) => {
        if (error) return next(new Error('Authentication error'));
        socket.user = decoded;
        next();
    });
});

// Current song management
let currentSong = null;
const getCurrentSong = () => { return currentSong; }
const setCurrentSong = (song) => { currentSong = song; };
const removeCurrentSong = () => { currentSong = null; };

// Listen for events on the SocketIO server, in a refactored manner
socketHandler(io, getCurrentSong, setCurrentSong, removeCurrentSong);

module.exports = { app, io, server };
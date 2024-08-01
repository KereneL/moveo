// Keep track of users and corresponding socket
const userSocketMap = {}; // {userId: socketId}

const socketHandler = (io, getCurrentSong, setCurrentSong, removeCurrentSong) => {
    try {
        io.on('connection', (socket) => {
            const userId = socket.handshake.query.userId;
            if (userId !== 'undefined') {
                userSocketMap[userId] = socket.id;
            }

            console.log(`A user connected: socketId=${socket.id}`);

            // Listen for song selection and update the state
            socket.on('select-song', (song) => {
                // Update the current song
                setCurrentSong(song);

                // Emit the new song selection on io server
                io.emit('song-selected', song);
            });

            // This refreshes the current song for the requesting socket
            socket.on('request-current-song', () => {
                const currentSong = getCurrentSong()

                // Send the current song to socket
                socket.emit('song-selected', currentSong);
            });

            // On disconnect 
            socket.on('disconnect', () => {
                // Remove from userSocketmap
                delete userSocketMap[userId];

                // If the disconnected user is an admin, end the jam session
                if (socket.user.isAdmin) {
                    removeCurrentSong();
                    io.emit('session-ended');
                }
            });
        });
    } catch (error) {
        console.log("Error in socketHandler", error.message);
        response.status(500).json({
            message: "Socket-related error occured",
            error,
        });
    };
};

module.exports = { socketHandler };
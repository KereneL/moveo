const express = require('express');
const getAllSongs = require('../songs/manageSongs')
const router = express.Router();

// Endpoint to get the current selected song
const jamRoutes = (getCurrentSong) => {

router.get("/current-song", (request, response) => {
    response.status(200).json(getCurrentSong || { error: 'No song selected' });
});

// Endpoint to select a song
router.post("/select-song", (request, response) => {
    const currentSong = request.body;
    io.emit('song-selected', currentSong); // Broadcast the selection
    response.status(200).send(currentSong);
 });
 
}
module.exports = jamRoutes;
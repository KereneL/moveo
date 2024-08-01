const express = require('express');
const getAllSongs = require('../songs/manageSongs')

const router = express.Router();

// Endpoint to get all songs from server
router.get("/get-all-songs", getAllSongs);

module.exports = router;
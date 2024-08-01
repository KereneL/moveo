const path = require('path');
const fs = require('fs');

const getAllSongs = async function (request, response) {
    try {
        const songsDir = path.join(__dirname, '..', '..', 'public', 'songs');;
        fs.readdir(songsDir, (error, files) => {
            if (error) {
                console.log("Error finding files: ", error);
                return response.status(500).send("Error retrieving song files");
            }

            const songs = [];
            const arrLength = files.length
            for (let i = 0; i < arrLength; i++) {
                const file = files[i];
                const extension = path.extname(file);
                if (extension == '.json' || extension == '.JSON') {
                    let raw = fs.readFileSync(path.join(songsDir, file));
                    let filename = path.basename(file, extension)
                    let song = {
                        name: filename.replace("_"," "),
                        raw:JSON.parse(raw)
                    }
                    songs.push(song);
                }
            };

            // Send empty array if no files found
            response.json(songs);
        });
    } catch (error) {
        console.log("Error in manageSongs", error.message);
        response.status(500).json({
            message: "An error occured while retrieving songs",
            error,
        });
    };
}

module.exports = getAllSongs;
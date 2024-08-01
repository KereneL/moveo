import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSocketContext } from '../context/SocketContext';

const SongLookup = () => {
    const [songs, setSongs] = useState([]);
    const { selectSong } = useSocketContext();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchSongs = async function () {
            try {
                const response = await fetch(`${apiUrl}/songs/get-all-songs`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                })
                const data = await response.json();  // Correctly parsing the JSON response
                setSongs(data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchSongs();
    }, [apiUrl]);

    const handleSelectSong = (song) => {
        selectSong(song);
    };

    return (
        <div>
            <h2>Song Lookup</h2>
            <ul>
                {songs.map(song => (
                    <li key={song.name}>
                        <p>{song.name}</p>
                        <Button
                            variant="outline-primary"
                            type="submit"
                            onClick={(event) => handleSelectSong(song)}
                            size="sm">
                            Select
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SongLookup;
import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { useSocketContext } from '../context/SocketContext';
const SongLookup = () => {
    const [songs, setSongs] = useState([]);
    const [search, setSearch] = useState(''); // State for the search input
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

    const filteredSongs = songs.filter(song =>
        song.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column">
                <Form.Control
                    type="text"
                    placeholder="Search songs"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mb-3"
                    style={{ width: "25rem" }}
                />
                <Table striped bordered hover size="sm" style={{ width: "25rem" }}>
                    <thead>
                        <tr>
                            <th style={{ width: "2rem" }} className="text-center">#</th>
                            <th>Song</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSongs.map((song, index) => (
                            <tr>
                                <td className="text-center">{index + 1}</td>
                                <td>
                                    <Button
                                        variant="link"
                                        type="submit"
                                        onClick={(event) => handleSelectSong(song)}
                                        size="sm"
                                        className="text-capitalize"
                                    >
                                        {song.name}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default SongLookup;
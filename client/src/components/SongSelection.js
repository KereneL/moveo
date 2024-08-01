import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useSocketContext } from '../context/SocketContext';  // Adjust path as necessary
import SongLookup from './SongLookup';
import SongDisplay from './SongDisplay';

const SongSelection = () => {
    const { authUser } = useAuthContext();
    const { selectedSong } = useSocketContext();

    if (selectedSong) {
        return (
            <div>
                <h1>Current Song: {selectedSong.name}</h1>
                <SongDisplay selectedSong={selectedSong}/>
            </div>
        );
    } else {
        return (
            <div>
                {authUser.isAdmin ? (
                    <SongLookup />
                ) : (
                    <p>SongSelection: Waiting for admin to select a resource...</p>
                )}
            </div>);

    }
};

export default SongSelection;
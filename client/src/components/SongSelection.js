import React from 'react';
import { Card } from 'react-bootstrap'
import { useAuthContext } from '../context/AuthContext';
import { useSocketContext } from '../context/SocketContext';  // Adjust path as necessary
import SongLookup from './SongLookup';
import SongDisplay from './SongDisplay';

const SongSelection = () => {
    const { authUser } = useAuthContext();
    const { selectedSong } = useSocketContext();

    if (selectedSong) {
        return (
                <SongDisplay selectedSong={selectedSong} />
        );
    } else {
        return (
            <div>
                <Card.Title className="mb-4">
                    Welcome, <span>{authUser.username} {(authUser.isAdmin) ? "🗝" : ""}</span>
                </Card.Title>

                {authUser.isAdmin ? (
                    <div>
                        <Card.Text>
                            Please choose a song for this jam session:
                        </Card.Text>
                        <SongLookup />
                    </div>
                ) : (
                    <div>
                        <Card.Text>
                            Waiting for admin to select a song for this jam session...
                        </Card.Text>
                    </div>
                )}
            </div>);

    }
};

export default SongSelection;
import React, { useEffect } from 'react';
import LogoutButton from '../components/LogoutButton';
import { useAuthContext } from '../context/AuthContext';
import { useSocketContext } from '../context/SocketContext'; // Adjust the path to your SocketContext
import SongSelection from '../components/SongSelection';
//import { Jam } from '../components/Jam'

export const LiveJam = () => {
    const { authUser } = useAuthContext();
    const { socket } = useSocketContext();

    useEffect(() => {
        if (socket) {
            const handleConnect = () => {
                console.log('Connected to socket server');
            };

            const handleDisconnect = () => {
                console.log('Disconnected from socket server');
            };

            socket.on('connect', handleConnect);
            socket.on('disconnect', handleDisconnect);

            return () => {
                socket.off('connect', handleConnect);
                socket.off('disconnect', handleDisconnect);
            };
        }
    }, [socket]);

    return (
        <div className="d-flex justify-content-center">
            <div className="p-3">

                <h3>Welcome to the Live Jam, <span>{authUser.username} {(authUser.isAdmin) ? "🗝" : ""}</span></h3>
                <br />
                <SongSelection />
                <br />
                <LogoutButton />

            </div>
        </div>
    )
};
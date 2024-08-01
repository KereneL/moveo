import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap'
import LogoutButton from '../components/LogoutButton';
import { useSocketContext } from '../context/SocketContext'; // Adjust the path to your SocketContext
import SongSelection from '../components/SongSelection';

export const LiveJam = () => {
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
            <Card style={{ width: "40rem" }}>

                <Card.Header className="d-flex justify-content-between ">
                    <Card.Title className="mb-0 fs-3" >🎶 Live Jam</Card.Title>
                    <LogoutButton />
                </Card.Header>
                <Card.Body>
                    <SongSelection />
                </Card.Body>
            </Card>
        </div>
    )
};
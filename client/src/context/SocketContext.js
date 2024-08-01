import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const { authUser } = useAuthContext();
    const socketRef = useRef(null);
    const [selectedSong, setSelectedSong] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        if (authUser) {
            if (!socketRef.current) {
                const newSocket = io(`${apiUrl}/`, {
                    auth: { token: authUser.token },
                });

                socketRef.current = newSocket;

                newSocket.on('connect', () => {
                    newSocket.emit('request-current-song');
                });

                newSocket.on('song-selected', (song) => {
                    setSelectedSong(song)
                });

                newSocket.on('disconnect', () => {
                    setSelectedSong(null);
                });

                newSocket.on('session-ended', () => {
                    setSelectedSong(null);
                });

                return () => {
                    newSocket.disconnect();
                    socketRef.current = null;
                    //console.log('Socket disconnected and state cleaned');
                };
            }
        } else {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
                //console.log('Socket disconnected and state cleaned');
            }
        }
    }, [authUser, navigate, apiUrl]);

    const selectSong = (song) => {
        if (socketRef.current) {
            socketRef.current.emit('select-song', song);
        }
    };

    return (
        <SocketContext.Provider value={{ socket: socketRef.current, selectedSong, selectSong }}>
            {children}
        </SocketContext.Provider>
    );
};
import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Connect to the backend socket server
        const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
            withCredentials: true,
        });
        
        setSocket(newSocket);

        // Disconnect cleanly when the app unmounts
        return () => newSocket.close();
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
const { Server } = require('socket.io');

let io;

module.exports = {
    // Initialize the socket server
    init: (httpServer) => {
        io = new Server(httpServer, {
            cors: {
                origin: [process.env.ADMIN_FRONTEND_URL, process.env.USER_FRONTEND_URL],
                methods: ["GET", "POST", "PUT", "DELETE"],
                credentials: true
            }
        });
        return io;
    },
    // Retrieve the socket instance to emit events from controllers
    getIO: () => {
        if (!io) {
            throw new Error("Socket.io is not initialized!");
        }
        return io;
    }
};
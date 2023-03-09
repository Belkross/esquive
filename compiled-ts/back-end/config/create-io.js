import { Server as SocketIoServer } from "socket.io";
export function createIo(httpServer) {
    return new SocketIoServer(httpServer, {
        cors: {
            origin: ["https://esquive.belkross.com", "http://localhost:5173", "http://localhost:4173"],
        },
    });
}

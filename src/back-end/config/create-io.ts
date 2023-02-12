import { Server as SocketIoServer } from "socket.io"
import type { Server } from "node:http"
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from "../../types/type-server"

export default function createIo(httpServer: Server) {
  return new SocketIoServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
    cors: {
      origin: ["https://esquive.belkross.com", "http://localhost:5173", "http://localhost:4173"],
    },
  })
}

import { Server as SocketIoServer } from "socket.io"
import type { Server } from "node:http"
import { ClientToServerEvents, ServerToClientEvents } from "../../types/type-server"

export function createIo(httpServer: Server) {
  return new SocketIoServer<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: {
      origin: ["https://esquive.belkross.com", "http://localhost:5173", "http://localhost:4173"],
    },
  })
}

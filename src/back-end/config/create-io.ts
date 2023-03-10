import { Server as SocketIoServer } from "socket.io"
import type { Server } from "node:http"
import { ClientToServerEvents, ServerToClientEvents } from "../../types/server"

export function createIo(httpServer: Server) {
  return new SocketIoServer<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:4173", `${process.env.CLIENT_URL}`],
    },
  })
}

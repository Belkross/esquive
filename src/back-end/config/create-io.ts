import { Server as SocketIoServer } from "socket.io"
import type { Server } from "node:http"
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../../types/type-socket-io.js"

export default function createIo(httpServer: Server) {
  return new SocketIoServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
    cors: {
      origin: ["https://esquive.belkross.com", "http://localhost:5173", "http://localhost:4173"],
    },
  })
}

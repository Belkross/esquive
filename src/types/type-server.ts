import { Server, Socket } from "socket.io"
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from "./type-socket-io"

export interface ServerManager {
  io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
  socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
}

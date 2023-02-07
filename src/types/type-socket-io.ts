import { Server, Socket } from "socket.io"

export interface ServerToClientEvents {
  connectedToSocketIo: () => void
}

export interface ClientToServerEvents {
  joinRoom: (room: string, username: string) => void
}

export interface InterServerEvents {
  interServerEvents?: unknown //deletable. Just to avoid empty interface and respect socket.io’s recommended Server architecture
}

export interface SocketData {
  socketData?: unknown //deletable. Just to avoid empty interface and respect socket.io’s recommended Server architecture
}

export interface ServerHandler {
  io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
  socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
}

import { Server, Socket } from "socket.io"
import { RoomState } from "../back-end/config/room-state.js"
import { SessionStorage } from "../back-end/config/session-storage.js"
import { AlertId } from "../front-end/components/alert-feature/alerts"

export type ServerToClientEvents = {
  alert: (alertId: AlertId) => void
  joinRoom: (data: { sessionId: string; username: string; roomState: RoomState }) => void
  leaveRoom: () => void
}

export type ClientToServerEvents = {
  leaveRoom: () => void
}

export type SocketManager = Socket<ClientToServerEvents, ServerToClientEvents>
export type IoManager = Server<ClientToServerEvents, ServerToClientEvents>

export type ServerManager = {
  io: IoManager
  socket: SocketManager
  sessions: SessionStorage
}

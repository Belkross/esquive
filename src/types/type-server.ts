import { Server, Socket } from "socket.io"
import SessionStorage from "../back-end/config/session-storage.js"
import { AlertId } from "../front-end/components/alert-feature/functions/alerts"

export type ServerToClientEvents = {
  alertClient: (alertId: AlertId) => void
  clientJoinedRoom: (data: { sessionId: string; username: string; room: string; roomState: "roomState" }) => void
}

export type ClientToServerEvents = {
  //..
}

export type SocketManager = Socket<ClientToServerEvents, ServerToClientEvents>
export type IoManager = Server<ClientToServerEvents, ServerToClientEvents>

export type ServerManager = {
  io: IoManager
  socket: SocketManager
  sessions: SessionStorage
}

import { Server, Socket } from "socket.io"
import { RoomState } from "../back-end/config/room-state/room-state.js"
import { RoomStorage } from "../back-end/config/room-storage.js"
import { SessionStorage } from "../back-end/config/session-storage.js"
import { AlertId } from "../front-end/components/alert-feature/alerts"
import { FlowlessFunction } from "./main.js"

export type ServerToClientEvents = {
  alert: (alertId: AlertId) => void
  joinRoom: (browserId: string, roomState: RoomState) => void
  roomStateUpdate: (state: RoomState) => void
}

export type ClientToServerEvents = {
  changeRole: (team: Team, role: Role) => void
  nextRoundPhase: FlowlessFunction
}

export type SocketManager = Socket<ClientToServerEvents, ServerToClientEvents>
export type IoManager = Server<ClientToServerEvents, ServerToClientEvents>

export type ServerManager = {
  io: IoManager
  socket: SocketManager
  sessions: SessionStorage
  rooms: RoomStorage
}

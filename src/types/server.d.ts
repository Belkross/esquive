import { Server, Socket as SocketServer } from "socket.io"
import { Socket as SocketClient } from "socket.io-client"
import { RoomState } from "../back-end/config/room-state/room-state.js"
import { RoomStorage } from "../back-end/config/room-storage.js"
import { SessionStorage } from "../back-end/config/session-storage.js"
import { AlertId } from "../front-end/components/alert-feature/alerts"
import { FlowlessFunction } from "./main.js"

export type ServerToClientEvents = {
  alert: (alertId: AlertId) => void
  joinRoom: (browserId: string, roomState: RoomState) => void
  roomStateUpdate: (state: RoomState) => void
  closeDuplicatedSessions: (browserId: string) => void
}

export type ClientToServerEvents = {
  changeRole: (team: Team, role: Role) => void
  nextRoundPhase: FlowlessFunction
}

export type Io = Server<ClientToServerEvents, ServerToClientEvents>
export type SocketServer = SocketServer<ClientToServerEvents, ServerToClientEvents>
export type SocketClient = SocketClient<ServerToClientEvents, ClientToServerEvents>

export type ServerManager = {
  io: Io
  socket: SocketServer
  sessions: SessionStorage
  rooms: RoomStorage
  browserId: string
}

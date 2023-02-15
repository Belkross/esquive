import { Server, Socket } from "socket.io"
import { MapStorage } from "../functions/map-storage.js"
import { RoomState } from "../back-end/config/room-state.js"
import { AlertId } from "../front-end/components/alert-feature/alerts"

type Session = {
  username: string
  room: string
}

export type SessionStorage = MapStorage<string, Session>
export type RoomStorage = MapStorage<string, RoomState>

export type ServerToClientEvents = {
  alert: (alertId: AlertId) => void
  joinRoom: (data: { browserId: string; username: string; roomState: RoomState }) => void
  leaveRoom: () => void
  roomStateUpdate: (state: RoomState) => void
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
  rooms: RoomStorage
}

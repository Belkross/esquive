import { Server, Socket } from "socket.io"
import { Socket as SocketClient } from "socket.io-client"
import { RoomState } from "../back-end/config/room-state/room-state.js"
import { RoomStorage } from "../back-end/config/room-storage.js"
import { SessionStorage } from "../back-end/config/session-storage.js"
import { AlertId } from "../front-end/components/alert-feature/alerts"
import { ChatChannel, FlowlessFunction } from "./types.js"
import { RoundSettings } from "./room-state.js"

export type ServerToClientEvents = {
  alert: (alertId: AlertId) => void
  joinRoom: (sessionId: string, roomState: RoomState) => void
  roomStateUpdate: (state: RoomState) => void
}

export type ClientToServerEvents = {
  activateTrap: (trap: string) => void
  cancelTrap: (trap: string) => void
  changeRole: (team: Team, role: Role) => void
  changeRoundSettings: (settings: RoundSettings) => void
  changeSecretWord: FlowlessFunction
  judgeTrap: (judgement: boolean) => void
  kickPlayer: (kickedSessionId: string) => void
  nextRoundPhase: FlowlessFunction
  promoteAdmin: (promotedSessionId: string) => void
  reportForbiddenClue: FlowlessFunction
  submitChatMessage: (channel: ChatChannel, message: string) => void
  submitGuess: (guess: string) => void
  submitTrap: (trap: string) => void
  submitSecretWordOpinion: (opinion: boolean) => void
  submitTrapOpinion: (trap: string, opinion: boolean) => void
  shuffleTeams: FlowlessFunction
  toggleRoomAccess: FlowlessFunction
  updateTypingActivity: (status: boolean) => void
}

export type Io = Server<ClientToServerEvents, ServerToClientEvents>
export type SocketServer = Socket<ClientToServerEvents, ServerToClientEvents>
export type SocketClient = SocketClient<ServerToClientEvents, ClientToServerEvents>

export type ServerManager = {
  io: Io
  socket: SocketServer
  sessions: SessionStorage
  rooms: RoomStorage
  sessionId: string
}

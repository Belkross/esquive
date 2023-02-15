import { RoomState } from "../back-end/config/room-state.js"

export type FlowlessFunction = () => void

export type ThemeMode = "light" | "dark"

export type AppStatus = "logging" | "connectingToSocketIo" | "logged"

export type AppState = {
  status: AppStatus
  username: string
  room: string | undefined
  roomState: RoomState | undefined
  browserId: string | null
}

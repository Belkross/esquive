import { Dispatch, SetStateAction } from "react"
import { RoomState } from "../back-end/config/room-state.js"

export type FlowlessFunction = () => void

export type ThemeMode = "light" | "dark"

export type AppStatus = "logging" | "connectingToSocketIo" | "logged"
export type AppState = {
  status: AppStatus
  username: string
  room: string
  browserId: string
  roomState: RoomState
}

export type setState<Type> = Dispatch<SetStateAction<Type>>
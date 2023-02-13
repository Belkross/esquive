export type FlowlessFunction = () => void

export const themeModes = ["dark", "light"] as const
export type ThemeMode = typeof themeModes[number]

export type AppStatus = "logging" | "connectingToSocketIo" | "logged"
export type AppState = {
  status: AppStatus
  username: string
  room: string | undefined
}

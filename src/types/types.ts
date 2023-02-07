export type FlowlessFunction = () => void

export const themeModes = ["dark", "light"] as const
export type ThemeMode = typeof themeModes[number]

export type AppStatus = "connectingToSocketIo" | "loadingApp" | "logging" | "logged"
export type AppState = {
  status: AppStatus
  username: string
  room: string | null
}

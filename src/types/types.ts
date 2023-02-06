export const themeModes = ["dark", "light"] as const
export type ThemeMode = typeof themeModes[number]
import { RoomState } from "../back-end/config/room-state/room-state.js"

export function checkUsernameValidity(username: unknown) {
  if (typeof username !== "string") return false

  const modele = `^[a-zéèëêàâäïîôöÿçùûüœæ]{${RoomState.USERNAME_MIN_LENGTH},${RoomState.USERNAME_MAX_LENGTH}}$`
  const regex = new RegExp(modele, "i")

  return regex.test(username)
}

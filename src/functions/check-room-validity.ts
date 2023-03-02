import { RoomState } from "../back-end/config/room-state/room-state.js"

export function checkRoomValidity(room: unknown) {
  if (typeof room !== "string") return false

  const modele = `^[a-zéèëêàâäïîôöÿçùûüœæ]{${RoomState.ROOMNAME_MIN_LENGTH},${RoomState.ROOMNAME_MAX_LENGTH}}$`
  const regex = new RegExp(modele, "i")

  return regex.test(room)
}

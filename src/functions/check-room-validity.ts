import { ROOM_MIN_LENGTH, ROOM_MAX_LENGTH } from "../config/app-constants.js"

export function checkRoomValidity(room: unknown) {
  if (typeof room !== "string") return false

  const modele = `^[a-zéèëêàâäïîôöÿçùûüœæ]{${ROOM_MIN_LENGTH},${ROOM_MAX_LENGTH}}$`
  const regex = new RegExp(modele, "i")

  return regex.test(room)
}

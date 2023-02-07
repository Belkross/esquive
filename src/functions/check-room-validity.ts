import { ROOM_MAX_LENGTH, ROOM_MIN_LENGTH } from "../config/app-constants"

export default function checkRoomValidity(room: string) {
  const modele = `^[a-zéèëêàâäïîôöÿçùûüœæ]{${ROOM_MIN_LENGTH},${ROOM_MAX_LENGTH}}$`
  const regex = new RegExp(modele, "i")
  return regex.test(room)
}

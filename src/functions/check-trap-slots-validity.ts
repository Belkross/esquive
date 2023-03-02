import { RoomState } from "../back-end/config/room-state/room-state.js"

export function checkTrapSlotsValidity(input: unknown) {
  const inputIsNotNumber = typeof input !== "number"
  if (inputIsNotNumber) return false

  return input >= 1 && input <= RoomState.TRAP_SLOT_LIMIT
}

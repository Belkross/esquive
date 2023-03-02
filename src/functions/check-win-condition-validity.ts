import { RoomState } from "../back-end/config/room-state/room-state.js"

export function checkWinConditionValidity(input: unknown) {
  const inputIsNotNumber = typeof input !== "number"
  if (inputIsNotNumber) return false

  return input >= 1 && input <= RoomState.WIN_CONDITION_LIMIT
}

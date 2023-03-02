import { RoomState } from "../back-end/config/room-state/room-state.js"

export function checkTimerDurationValidity(input: unknown) {
  const inputIsNotNumber = typeof input !== "number"
  if (inputIsNotNumber) return false

  return input > 0 && input <= RoomState.TIMER_LIMIT
}

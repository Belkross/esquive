import { TIMER_LIMIT } from "../config/app-constants.js"

export function checkTimerDurationValidity(input: unknown) {
  const inputIsNotNumber = typeof input !== "number"
  if (inputIsNotNumber) return false

  return input > 0 && input <= TIMER_LIMIT
}

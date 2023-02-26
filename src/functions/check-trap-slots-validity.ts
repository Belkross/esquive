import { TRAP_SLOT_LIMIT } from "../config/app-constants.js"

export function checkTrapSlotsValidity(input: unknown) {
  const inputIsNotNumber = typeof input !== "number"
  if (inputIsNotNumber) return false

  return input >= 1 && input <= TRAP_SLOT_LIMIT
}

import { WIN_CONDITION_LIMIT } from "../config/app-constants.js"

export function checkWinConditionValidity(input: unknown) {
  const inputIsNotNumber = typeof input !== "number"
  if (inputIsNotNumber) return false

  return input >= 1 && input <= WIN_CONDITION_LIMIT
}

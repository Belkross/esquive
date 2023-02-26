import { GUESS_ATTEMPT_LIMIT } from "../config/app-constants.js"

export function checkGuessAttemptsValidity(input: unknown) {
  const inputIsNotNumber = typeof input !== "number"
  if (inputIsNotNumber) return false

  return input >= 1 && input <= GUESS_ATTEMPT_LIMIT
}

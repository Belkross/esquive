import { DEFAULT_USERNAME } from "../config/app-constants"
import { checkUsernameValidity } from "./check-username-validity.js"

export function getInitialUsername(localStorageKey: string) {
  const storedUsername = localStorage.getItem(localStorageKey)

  return storedUsername && checkUsernameValidity(storedUsername) ? storedUsername : DEFAULT_USERNAME
}

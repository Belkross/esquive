import { checkUsernameValidity } from "./check-username-validity.js"

const DEFAULT_USERNAME = ""

export function getInitialUsername(localStorageKey: string) {
  const storedUsername = localStorage.getItem(localStorageKey)

  return storedUsername && checkUsernameValidity(storedUsername) ? storedUsername : DEFAULT_USERNAME
}

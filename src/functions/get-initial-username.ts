import { DEFAULT_USERNAME } from "../config/app-constants"
import checkUsernameValidity from "./check-username-validity"

export default function getInitialUsername(localStorageKey: string) {
  const storedUsername = localStorage.getItem(localStorageKey)

  return storedUsername && checkUsernameValidity(storedUsername) ? storedUsername : DEFAULT_USERNAME
}

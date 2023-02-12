import { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH } from "../config/app-constants.js"

export default function checkUsernameValidity(username: unknown) {
  if (typeof username !== "string") return false

  const modele = `^[a-zéèëêàâäïîôöÿçùûüœæ]{${USERNAME_MIN_LENGTH},${USERNAME_MAX_LENGTH}}$`
  const regex = new RegExp(modele, "i")

  return regex.test(username)
}

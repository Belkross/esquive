import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "../config/app-constants"

export default function checkUsernameValidity(username: string) {
  const modele = `^[a-zéèëêàâäïîôöÿçùûüœæ]{${USERNAME_MIN_LENGTH},${USERNAME_MAX_LENGTH}}$`
  const regex = new RegExp(modele, "i")

  return regex.test(username)
}

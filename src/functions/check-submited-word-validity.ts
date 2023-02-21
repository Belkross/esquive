import { WORD_SUBMITION_MAX_LENGTH, WORD_SUBMITION_MIN_LENGTH } from "../config/app-constants.js"

export function checkSubmitedWordValidity(word: unknown) {
  if (typeof word !== "string") return false

  const modele = `^[a-zéèëêàâäïîôöÿçùûüœæ]{${WORD_SUBMITION_MIN_LENGTH},${WORD_SUBMITION_MAX_LENGTH}}$`
  const regex = new RegExp(modele, "i")

  return regex.test(word)
}

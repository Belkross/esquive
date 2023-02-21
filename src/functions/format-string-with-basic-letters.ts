import { replaceDiacriticals } from "./replace-diacriticals.js"

export function formatStringWithBasicLetters(word: string) {
  return replaceDiacriticals(word).toLocaleLowerCase()
}

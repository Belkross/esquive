import { replaceDiacriticals } from "./replace-diacriticals.js";
export function formatStringWithBasicLetters(word) {
    return replaceDiacriticals(word).toLocaleLowerCase();
}

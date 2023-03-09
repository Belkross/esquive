import { shuffleArray } from "../../../../functions/shuffle-array.js";
export function initializeSecretWordsDeck(wordsList) {
    const array = wordsList.split("\n");
    return shuffleArray(array);
}

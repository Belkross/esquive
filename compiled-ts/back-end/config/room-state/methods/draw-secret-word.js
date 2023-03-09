import { shuffleArray } from "../../../../functions/shuffle-array.js";
export function drawSecretWord(team) {
    const noMoreToDraw = this.secretWordsDeckDrawIndex >= this.secretWordsDeck.length;
    if (noMoreToDraw)
        reuseDeck.call(this);
    this.teams[team].secretWord = { value: this.secretWordsDeck[this.secretWordsDeckDrawIndex], opinions: {} };
    ++this.secretWordsDeckDrawIndex;
}
function reuseDeck() {
    this.secretWordsDeck = shuffleArray(this.secretWordsDeck);
    this.secretWordsDeckDrawIndex = 0;
}

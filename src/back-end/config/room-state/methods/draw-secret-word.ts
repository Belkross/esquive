import { shuffleArray } from "../../../../functions/shuffle-array.js"
import { Team } from "../../../../types/room-state.js"
import { RoomState } from "../room-state.js"

export function drawSecretWord(this: RoomState, team: Team) {
  const noMoreToDraw = this.secretWordsDeckDrawIndex >= this.secretWordsDeck.length
  if (noMoreToDraw) reuseDeck.call(this)

  this.teams[team].secretWord = { value: this.secretWordsDeck[this.secretWordsDeckDrawIndex], opinions: {} }
  ++this.secretWordsDeckDrawIndex
}

function reuseDeck(this: RoomState) {
  this.secretWordsDeck = shuffleArray(this.secretWordsDeck)
  this.secretWordsDeckDrawIndex = 0
}

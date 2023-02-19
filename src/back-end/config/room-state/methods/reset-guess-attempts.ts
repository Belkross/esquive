import { RoomState } from "../room-state.js"

export function resetGuessAttempts(this: RoomState) {
  this.teams.one.guessAttempts.length = 0
  this.teams.two.guessAttempts.length = 0
}

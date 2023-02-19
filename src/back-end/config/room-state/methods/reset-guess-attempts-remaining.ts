import { RoomState } from "../room-state.js"

export function resetGuessAttemptsRemaining(this: RoomState) {
  this.teams.one.guessAttemptsRemaining = this.guessAttemptsProvided
  this.teams.two.guessAttemptsRemaining = this.guessAttemptsProvided
}

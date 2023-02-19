import { RoomState } from "../room-state.js"

export function applyRoundOutcome(this: RoomState) {
  const teamOneScored = this.teams.one.hasSucceededGuess === true && this.teams.two.hasSucceededGuess === false
  const teamTwoScored = this.teams.one.hasSucceededGuess === false && this.teams.two.hasSucceededGuess === true

  if (teamOneScored) ++this.teams.one.score
  else if (teamTwoScored) ++this.teams.two.score
  else return
}

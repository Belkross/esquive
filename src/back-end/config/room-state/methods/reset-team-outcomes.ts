import { RoomState } from "../room-state.js"

export function resetTeamOutcomes(this: RoomState) {
  this.teams.one.hasSucceededGuess = undefined
  this.teams.two.hasSucceededGuess = undefined

  this.teams.one.trapped = false
  this.teams.two.trapped = false
}

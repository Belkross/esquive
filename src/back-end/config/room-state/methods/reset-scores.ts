import { RoomState } from "../room-state.js"

export function resetScores(this: RoomState) {
  this.teams.one.score = 0
  this.teams.two.score = 0
}

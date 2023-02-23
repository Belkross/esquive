import { RoomState } from "../room-state.js"

export function getPlayingTeam(this: RoomState) {
  if (this.roundAdvancement === 3 || this.roundAdvancement === 4) {
    return this.startingTeam
  } else if (this.roundAdvancement === 5 || this.roundAdvancement === 6) {
    return this.getOpponentTeam(this.startingTeam)
  } else {
    return "one"
  }
}

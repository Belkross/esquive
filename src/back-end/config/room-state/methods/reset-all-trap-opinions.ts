import { RoomState } from "../room-state.js"

export function resetAllTrapOpinions(this: RoomState) {
  for (const player in this.players) {
    for (const opinion in this.players[player].trapOpinions) {
      this.players[player].trapOpinions[opinion] = undefined
    }
  }
}

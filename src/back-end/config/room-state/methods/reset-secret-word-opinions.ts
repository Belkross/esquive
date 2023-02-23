import { Team } from "../../../../types/room-state.js"
import { RoomState } from "../room-state.js"

export function resetSecretWordOpinions(this: RoomState, team: "bothTeam" | Team) {
  if (team === "bothTeam") resetAllPlayersOpinion.call(this)
  else resetTeamOpinion.call(this, team)
}

function resetAllPlayersOpinion(this: RoomState) {
  for (const player in this.players) {
    this.players[player].secretWordOpinion = undefined
  }
}

fuction resetTeamOpinion(this: RoomState, team: Team) {
  for (const player in this.players) {
    if (this.players[player].team === team) this.players[player].secretWordOpinion = undefined
  }
}

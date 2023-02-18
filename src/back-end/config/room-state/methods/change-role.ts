import { Team, Role } from "../../../../types/room-state.js"
import { RoomState } from "../room-state.js"

type Parameters = {
  browserId: string
  newTeam: Team
  newRole: Role
}

export function changeRole(this: RoomState, parameters: Parameters) {
  const { browserId, newTeam, newRole } = parameters

  if (newRole === "orator") makeSureOnlyOneOrator.call(this, newTeam)

  this.players[browserId].role = newRole
  this.players[browserId].team = newTeam
}

function makeSureOnlyOneOrator(this: RoomState, newTeam: Team) {
  for (const player in this.players) {
    const playerIsInSameTeam = this.players[player].team === newTeam

    if (playerIsInSameTeam) {
      this.players[player].role = "guesser"
    }
  }
}

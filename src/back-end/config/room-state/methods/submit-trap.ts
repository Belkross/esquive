import { getClientTeam } from "../../../../functions/get-client-team.js"
import { Trap } from "../team-data.js"
import { RoomState } from "../room-state.js"

export function submitTrap(this: RoomState, sessionId: string, trap: string) {
  const clientTeam = getClientTeam(this, sessionId)
  const username = this.players[sessionId].username

  const submition: Trap = {
    value: trap,
    author: username,
    opinions: {},
  }

  this.teams[clientTeam].traps[trap] = submition
}

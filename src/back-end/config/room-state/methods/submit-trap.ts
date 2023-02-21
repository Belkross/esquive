import { getClientTeam } from "../../../../functions/get-client-team.js"
import { RoomState } from "../room-state.js"

export function submitTrap(this: RoomState, sessionId: string, trap: string) {
  const clientTeam = getClientTeam(this, sessionId)
  const username = this.players[sessionId].username

  const submition = {
    value: trap,
    author: username,
  }

  this.teams[clientTeam].traps.push(submition)
}

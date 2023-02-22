import { getClientTeam } from "../../../../functions/get-client-team.js"
import { RoomState } from "../room-state.js"

export function submitTrap(this: RoomState, sessionId: string, trap: string) {
  const clientTeam = getClientTeam(this, sessionId)
  const username = this.players[sessionId].username

  const submition = {
    value: trap,
    author: username,
  }

  for (const trapKey in this.teams[clientTeam].traps) {
    const slotAvailable = this.teams[clientTeam].traps[trapKey] === undefined
    if (slotAvailable) {
      this.teams[clientTeam].traps[trapKey] = submition
      return
    }
  }
}

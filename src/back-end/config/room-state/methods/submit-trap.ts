import { getPlayerTeam } from "../../../../functions/get-player-team.js"
import { Trap } from "../team-data.js"
import { RoomState } from "../room-state.js"

export function submitTrap(this: RoomState, sessionId: string, trap: string) {
  const clientTeam = getPlayerTeam(this, sessionId)
  const username = this.players[sessionId].username

  const submition: Trap = {
    value: trap,
    author: username,
    opinions: {},
  }

  this.teams[clientTeam].traps[trap] = submition
}

import { getPlayerTeam } from "../../../../functions/get-player-team.js"
import { RoomState } from "../room-state.js"

export function cancelTrap(this: RoomState, sessionId: string, cancelledTrap: string) {
  const clientTeam = getPlayerTeam(this, sessionId)

  delete this.teams[clientTeam].traps[cancelledTrap]
}

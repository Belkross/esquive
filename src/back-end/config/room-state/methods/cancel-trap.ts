import { getClientTeam } from "../../../../functions/get-client-team.js"
import { RoomState } from "../room-state.js"

export function cancelTrap(this: RoomState, sessionId: string, cancelledTrap: string) {
  const clientTeam = getClientTeam(this, sessionId)

  delete this.teams[clientTeam].traps[cancelledTrap]
}

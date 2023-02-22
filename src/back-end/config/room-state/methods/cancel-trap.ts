import { getClientTeam } from "../../../../functions/get-client-team.js"
import { RoomState } from "../room-state.js"

export function cancelTrap(this: RoomState, sessionId: string, cancelledTrap: string) {
  const clientTeam = getClientTeam(this, sessionId)

  for (const trapKey in this.teams[clientTeam].traps) {
    const trapValueMatch = this.teams[clientTeam].traps[trapKey]?.value === cancelledTrap
    if (trapValueMatch) {
      this.teams[clientTeam].traps[trapKey] = undefined
      return
    }
  }
}

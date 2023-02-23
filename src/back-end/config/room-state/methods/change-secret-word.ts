import { getPlayerTeam } from "../../../../functions/get-player-team.js"
import { RoomState } from "../room-state.js"

export function changeSecretWord(this: RoomState, sessionId: string) {
  const clientTeam = getPlayerTeam(this, sessionId)

  --this.teams[clientTeam].secretWordChangeRemaining
  this.drawSecretWord(clientTeam)
}

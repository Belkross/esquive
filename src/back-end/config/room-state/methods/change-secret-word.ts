import { getClientTeam } from "../../../../functions/get-client-team.js";
import { RoomState } from "../room-state.js";

export function changeSecretWord(this:RoomState, sessionId: string) {
  const clientTeam = getClientTeam(this, sessionId)

  --this.teams[clientTeam].secretWordChangeRemaining
  this.drawSecretWord(clientTeam)
}
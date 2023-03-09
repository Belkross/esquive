import { getPlayerTeam } from "../../../../functions/get-player-team.js";
export function cancelTrap(sessionId, cancelledTrap) {
    const clientTeam = getPlayerTeam(this, sessionId);
    delete this.teams[clientTeam].traps[cancelledTrap];
}

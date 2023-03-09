import { getPlayerTeam } from "../../../../functions/get-player-team.js";
export function changeSecretWord(sessionId) {
    const clientTeam = getPlayerTeam(this, sessionId);
    --this.teams[clientTeam].secretWordChangeRemaining;
    this.drawSecretWord(clientTeam);
    for (const trapKey in this.teams[clientTeam].traps) {
        delete this.teams[clientTeam].traps[trapKey];
    }
}

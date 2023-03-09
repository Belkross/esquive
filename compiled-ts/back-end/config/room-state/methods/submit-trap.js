import { getPlayerTeam } from "../../../../functions/get-player-team.js";
export function submitTrap(sessionId, trap) {
    const clientTeam = getPlayerTeam(this, sessionId);
    const username = this.players[sessionId].username;
    const submition = {
        value: trap,
        author: username,
        opinions: {},
    };
    this.teams[clientTeam].traps[trap] = submition;
}

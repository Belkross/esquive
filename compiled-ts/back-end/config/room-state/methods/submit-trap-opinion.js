import { getPlayerTeam } from "../../../../functions/get-player-team.js";
export function submitTrapOpinion(sessionId, trap, newOpinion) {
    const clientTeam = getPlayerTeam(this, sessionId);
    const clientCurrentOpinion = this.teams[clientTeam].traps[trap].opinions[sessionId];
    const newOpinionIsDifferent = clientCurrentOpinion !== newOpinion;
    this.teams[clientTeam].traps[trap].opinions[sessionId] = newOpinionIsDifferent ? newOpinion : undefined;
}

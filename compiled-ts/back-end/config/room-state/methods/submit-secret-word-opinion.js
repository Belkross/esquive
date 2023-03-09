import { getPlayerTeam } from "../../../../functions/get-player-team.js";
export function submitSecretWordOpinion(sessionId, newOpinion) {
    const clientTeam = getPlayerTeam(this, sessionId);
    const clientCurrentOpinion = this.teams[clientTeam].secretWord.opinions[sessionId];
    const newOpinionIsDifferent = clientCurrentOpinion !== newOpinion;
    this.teams[clientTeam].secretWord.opinions[sessionId] = newOpinionIsDifferent ? newOpinion : undefined;
}

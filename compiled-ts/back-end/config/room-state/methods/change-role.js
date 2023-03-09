export function changeRole(parameters) {
    const { sessionId, newTeam, newRole } = parameters;
    if (newRole === "orator")
        makeSureOnlyOneOrator.call(this, newTeam);
    this.players[sessionId].role = newRole;
    this.players[sessionId].team = newTeam;
}
function makeSureOnlyOneOrator(newTeam) {
    for (const player in this.players) {
        const playerIsInSameTeam = this.players[player].team === newTeam;
        if (playerIsInSameTeam) {
            this.players[player].role = "guesser";
        }
    }
}

export function announceNextPhase() {
    switch (this.roundAdvancement) {
        case 1:
            this.addToHistoric("La phase de piège va commencer.");
            break;
        case 3: {
            announceNextPlayingTeam.call(this, this.startingTeam);
            break;
        }
        case 5: {
            announceNextPlayingTeam.call(this, this.getOpponentTeam(this.startingTeam));
            break;
        }
        // No default
    }
}
function announceNextPlayingTeam(team) {
    const teamColor = this.teams[team].color;
    this.addToHistoric(`L’équipe ${teamColor} s’apprête à jouer.`);
}

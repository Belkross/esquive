export function announceMatchWinner() {
    const teamOneWon = this.teams.one.score >= this.winCondition;
    const teamColor = teamOneWon ? this.teams.one.color : this.teams.two.color;
    this.addToHistoric(`L’équipe ${teamColor} remporte la partie !!!`);
}

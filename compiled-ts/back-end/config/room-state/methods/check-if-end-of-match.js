export function checkIfEndOfMatch() {
    const teamOneReachedWinCondition = this.teams.one.score >= this.winCondition;
    const teamTwoReachedWinCondition = this.teams.two.score >= this.winCondition;
    return teamOneReachedWinCondition || teamTwoReachedWinCondition;
}

export function resetTeamOutcomes() {
    this.teams.one.hasSucceededGuess = undefined;
    this.teams.two.hasSucceededGuess = undefined;
    this.teams.one.trapped = false;
    this.teams.two.trapped = false;
}

export function resetGuessAttemptsRemaining() {
    this.teams.one.guessAttemptsRemaining = this.guessAttemptsProvided;
    this.teams.two.guessAttemptsRemaining = this.guessAttemptsProvided;
}

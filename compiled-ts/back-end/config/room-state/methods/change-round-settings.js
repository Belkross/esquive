export function changeRoundSettings(settings) {
    const { trapSlotProvided, guessAttemptProvided, trappingDuration, guessingDuration, winCondition } = settings;
    this.trapSlotsProvided = trapSlotProvided;
    const guessAttemptsProvidedChanged = this.guessAttemptsProvided !== guessAttemptProvided;
    if (guessAttemptsProvidedChanged) {
        this.guessAttemptsProvided = guessAttemptProvided;
        this.resetGuessAttemptsRemaining();
        this.teams.one.trapped = false;
        this.teams.two.trapped = false;
    }
    this.guessingDuration = guessingDuration;
    this.trappingDuration = trappingDuration;
    this.setTimer(trappingDuration);
    const winConditionHasChanged = this.winCondition !== winCondition;
    if (winConditionHasChanged) {
        this.winCondition = winCondition;
        this.resetScores();
    }
}

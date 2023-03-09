export class TeamData {
    color;
    opponent;
    traps = {};
    guessAttempts = [];
    score = 0;
    secretWord = { value: "", opinions: {} };
    secretWordChangeRemaining = 0;
    guessAttemptsRemaining = 0;
    hasSucceededGuess = undefined;
    trapped = false;
    constructor(team) {
        this.color = team === "one" ? "indigo" : "rouge";
        this.opponent = team === "one" ? "two" : "one";
    }
}

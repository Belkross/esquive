export function getPlayingTeam() {
    if (this.roundAdvancement === 3 || this.roundAdvancement === 4) {
        return this.startingTeam;
    }
    else if (this.roundAdvancement === 5 || this.roundAdvancement === 6) {
        return this.startingTeam === "one" ? "two" : "one";
    }
    else {
        return "one";
    }
}

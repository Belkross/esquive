export function resetTraps() {
    for (const trapKey in this.teams.one.traps) {
        delete this.teams.one.traps[trapKey];
    }
    for (const trapKey in this.teams.two.traps) {
        delete this.teams.two.traps[trapKey];
    }
}

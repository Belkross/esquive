export function checkTrapExistence(word, team) {
    const traps = this.teams[team].traps;
    for (const trapKey in traps) {
        if (traps[trapKey] === undefined)
            continue;
        if (traps[trapKey]?.value === word)
            return true;
    }
    return false;
}

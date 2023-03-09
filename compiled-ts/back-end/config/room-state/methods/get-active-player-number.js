export function getActivePlayerNumber() {
    const players = Object.values(this.players);
    return players.filter((player) => player.connected === true).length;
}

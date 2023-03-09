export function deletePlayer(sessionId) {
    delete this.players[sessionId];
}

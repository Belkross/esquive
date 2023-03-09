export function getPlayerTeam(roomState, sessionId) {
    return roomState.players[sessionId].team;
}

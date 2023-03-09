import { getSocketRoom } from "../../functions/get-socket-room.js";
export function updateTypingActivity(server) {
    const { socket, io, sessionId } = server;
    socket.on("updateTypingActivity", (status) => {
        const { roomName, roomState } = getSocketRoom(server);
        if (actionAllowed(roomState, sessionId)) {
            roomState.players[sessionId].isTyping = status;
            io.in(roomName).emit("roomStateUpdate", roomState);
        }
    });
}
function actionAllowed(roomState, sessionId) {
    const clientIsOrator = roomState.players[sessionId].role === "orator";
    const clientTeam = roomState.players[sessionId].team;
    const duringClientGuessingPhase = roomState.roundPhase === `guessing ${clientTeam}`;
    return duringClientGuessingPhase && clientIsOrator;
}

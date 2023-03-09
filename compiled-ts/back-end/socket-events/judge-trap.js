import { getSocketRoom } from "../../functions/get-socket-room.js";
export function judgeTrap(server) {
    const { io, socket, sessionId } = server;
    socket.on("judgeTrap", (judgement) => {
        const { roomName, roomState } = getSocketRoom(server);
        if (isAllowed(roomState, sessionId, judgement)) {
            roomState.judgeTrap(server, judgement);
            io.in(roomName).emit("roomStateUpdate", roomState);
        }
    });
}
function isAllowed(roomState, sessionId, judgement) {
    const roundPhase = roomState.roundPhase;
    const judgementTypeCorrect = typeof judgement === "boolean";
    const clientIsAdmin = roomState.players[sessionId].isAdmin;
    const isJudgingTrap = roomState.isJudgingTrap;
    const duringGuessingPhase = roundPhase === "guessing one" || roundPhase === "guessing two";
    return clientIsAdmin && isJudgingTrap && duringGuessingPhase && judgementTypeCorrect;
}

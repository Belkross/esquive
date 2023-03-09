import { getSocketRoom } from "../../functions/get-socket-room.js";
export function submitSecretWordOpinion(server) {
    const { io, socket, sessionId } = server;
    socket.on("submitSecretWordOpinion", (opinion) => {
        const { roomName, roomState } = getSocketRoom(server);
        if (isAllowed(roomState, opinion)) {
            roomState.submitSecretWordOpinion(sessionId, opinion);
            io.in(roomName).emit("roomStateUpdate", roomState);
        }
    });
}
function isAllowed(roomState, opinion) {
    const opinionTypeCorrect = typeof opinion === "boolean";
    const duringTrappingPhase = roomState.roundPhase === "trapping";
    return opinionTypeCorrect && duringTrappingPhase;
}

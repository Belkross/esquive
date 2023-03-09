import { getSocketRoom } from "../../functions/get-socket-room.js";
export function submitTrapOpinion(server) {
    const { io, socket, sessionId } = server;
    socket.on("submitTrapOpinion", (trap, opinion) => {
        const { roomName, roomState } = getSocketRoom(server);
        if (isAllowed(roomState, trap, opinion)) {
            roomState.submitTrapOpinion(sessionId, trap, opinion);
            io.in(roomName).emit("roomStateUpdate", roomState);
        }
    });
}
function isAllowed(roomState, trap, opinion) {
    const duringTrappingPhase = roomState.roundPhase === "trapping";
    const trapTypeCorrect = typeof trap === "string";
    const opinionTypeCorrect = typeof opinion === "boolean";
    return trapTypeCorrect && opinionTypeCorrect && duringTrappingPhase;
}

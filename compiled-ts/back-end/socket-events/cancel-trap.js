import { getPlayerTeam } from "../../functions/get-player-team.js";
import { getSocketRoom } from "../../functions/get-socket-room.js";
export function cancelTrap(server) {
    const { io, socket, sessionId } = server;
    socket.on("cancelTrap", (word) => {
        const { roomName, roomState } = getSocketRoom(server);
        if (isAllowed(roomState, sessionId, word)) {
            roomState.cancelTrap(sessionId, word);
            io.in(roomName).emit("roomStateUpdate", roomState);
        }
    });
}
function isAllowed(roomState, sessionId, word) {
    const clientTeam = getPlayerTeam(roomState, sessionId);
    const duringTrappingPhase = roomState.roundPhase === "trapping";
    const trapExist = roomState.checkTrapExistence(word, clientTeam);
    return duringTrappingPhase && trapExist;
}

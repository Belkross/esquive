import { getPlayerTeam } from "../../functions/get-player-team.js";
import { getSocketRoom } from "../../functions/get-socket-room.js";
export function activateTrap(server) {
    const { socket, io, sessionId } = server;
    socket.on("activateTrap", (trap) => {
        const { roomName, roomState } = getSocketRoom(server);
        if (actionAllowed(roomState, sessionId, trap)) {
            roomState.activateTrap(sessionId, trap);
            io.in(roomName).emit("roomStateUpdate", roomState);
        }
    });
}
function actionAllowed(roomState, sessionId, trap) {
    const clientTeam = getPlayerTeam(roomState, sessionId);
    const opponentTeam = roomState.getOpponentTeam(clientTeam);
    const trapTypeCorrect = typeof trap === "string";
    const trapExist = roomState.checkTrapExistence(trap, clientTeam);
    const duringOpponentGuessingPhase = roomState.roundPhase === `guessing ${opponentTeam}`;
    const isNotJudgingTrap = !roomState.isJudgingTrap;
    return trapTypeCorrect && trapExist && isNotJudgingTrap && duringOpponentGuessingPhase;
}

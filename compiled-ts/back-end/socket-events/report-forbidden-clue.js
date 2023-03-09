import { getPlayerTeam } from "../../functions/get-player-team.js";
import { getSocketRoom } from "../../functions/get-socket-room.js";
export function reportForbiddenClue(server) {
    const { socket, io, sessionId } = server;
    socket.on("reportForbiddenClue", () => {
        const { roomName, roomState } = getSocketRoom(server);
        if (actionAllowed(roomState, sessionId)) {
            roomState.reportForbiddenClue(sessionId);
            io.in(roomName).emit("roomStateUpdate", roomState);
        }
    });
}
function actionAllowed(roomState, sessionid) {
    const clientTeam = getPlayerTeam(roomState, sessionid);
    const opponentTeam = roomState.getOpponentTeam(clientTeam);
    const duringOpponentGuessingPhase = roomState.roundPhase === `guessing ${opponentTeam}`;
    const isNotJudgingTrap = !roomState.isJudgingTrap;
    return isNotJudgingTrap && duringOpponentGuessingPhase;
}

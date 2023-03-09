import { getSocketRoom } from "../../functions/get-socket-room.js";
export function shuffleTeams(server) {
    const { socket, io, sessionId } = server;
    socket.on("shuffleTeams", () => {
        const { roomName, roomState } = getSocketRoom(server);
        if (actionAllowed(roomState, sessionId)) {
            roomState.shuffleTeams(sessionId);
            io.in(roomName).emit("roomStateUpdate", roomState);
        }
    });
}
function actionAllowed(roomState, sessionId) {
    const clientIsAdmin = roomState.players[sessionId].isAdmin;
    const duringPreRoundPhase = roomState.roundPhase === "pre round";
    return clientIsAdmin && duringPreRoundPhase;
}

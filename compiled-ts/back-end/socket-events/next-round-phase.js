import { getSocketRoom } from "../../functions/get-socket-room.js";
export function nextRoundPhase(server) {
    const { io, socket, sessionId } = server;
    socket.on("nextRoundPhase", () => {
        const { roomName, roomState } = getSocketRoom(server);
        if (actionAllowed(server, roomState)) {
            const clientUsername = roomState.players[sessionId].username;
            roomState.configureNextRoundPhase(clientUsername);
            io.in(roomName).emit("roomStateUpdate", roomState);
            roomState.startTimer(io);
        }
    });
}
function actionAllowed(server, roomState) {
    const clientIsAdmin = roomState.players[server.sessionId].isAdmin;
    const roundPhase = roomState.roundPhase;
    const duringPassivePhase = roundPhase === "pre round" || roundPhase === "pre guessing one" || roundPhase === "pre guessing two";
    return clientIsAdmin && duringPassivePhase;
}
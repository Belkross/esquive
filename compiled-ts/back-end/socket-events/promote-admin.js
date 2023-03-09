import { getSocketRoom } from "../../functions/get-socket-room.js";
export function promoteAdmin(server) {
    const { socket, io, sessionId } = server;
    socket.on("promoteAdmin", (promotedSessionId) => {
        const { roomName, roomState } = getSocketRoom(server);
        if (actionAllowed(roomState, sessionId, promotedSessionId)) {
            roomState.players[promotedSessionId].isAdmin = true;
            io.in(roomName).emit("roomStateUpdate", roomState);
        }
    });
}
function actionAllowed(roomState, sessionId, promotedSessionId) {
    const clientIsAdmin = roomState.players[sessionId].isAdmin;
    const playerExist = promotedSessionId in roomState.players;
    return clientIsAdmin && playerExist;
}

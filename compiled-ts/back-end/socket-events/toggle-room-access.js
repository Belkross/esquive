import { getSocketRoom } from "../../functions/get-socket-room.js";
export function toggleRoomAccess(server) {
    const { socket, io, sessionId } = server;
    socket.on("toggleRoomAccess", () => {
        const { roomName, roomState } = getSocketRoom(server);
        if (actionAllowed(roomState, sessionId)) {
            roomState.roomOpened = !roomState.roomOpened;
            io.in(roomName).emit("roomStateUpdate", roomState);
        }
    });
}
function actionAllowed(roomState, sessionId) {
    return roomState.players[sessionId].isAdmin;
}

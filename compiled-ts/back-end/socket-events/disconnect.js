import { getSocketRoom } from "../../functions/get-socket-room.js";
export function disconnect(server) {
    const { sessions, rooms, io, socket, sessionId } = server;
    socket.on("disconnect", (reason) => {
        if (sessions.get(sessionId) === undefined)
            return; //session not found
        const { roomName, roomState } = getSocketRoom(server);
        const nobodyStillPlaying = roomState.getActivePlayerNumber() <= 1;
        const clientManuallyDisconnect = reason === "client namespace disconnect";
        if (nobodyStillPlaying) {
            roomState.timerIsRunning = false;
            sessions.delete(sessionId);
            rooms.delete(roomName);
            return;
        }
        if (clientManuallyDisconnect) {
            roomState.deletePlayer(sessionId);
            sessions.delete(sessionId);
        }
        else {
            roomState.players[sessionId].connected = false;
        }
        roomState.ensureSomeAdminInRoom();
        io.in(roomName).emit("roomStateUpdate", roomState);
    });
}

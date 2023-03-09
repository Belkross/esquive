import { getSocketRoom } from "../../functions/get-socket-room.js";
export function kickPlayer(server) {
    const { io, socket, sessions, sessionId } = server;
    socket.on("kickPlayer", async (kickedSessionId) => {
        const { roomName, roomState } = getSocketRoom(server);
        if (checkIfAllowed(roomState, sessionId)) {
            const sockets = await io.in(roomName).fetchSockets();
            const kickedSocket = sockets.find((socket) => socket.handshake.auth.sessionId === kickedSessionId);
            kickedSocket?.disconnect();
            sessions.delete(kickedSessionId);
            delete roomState.players[kickedSessionId];
            io.in(roomName).emit("roomStateUpdate", roomState);
        }
        else {
            if (!checkIfDuringRoundBeginning(roomState))
                socket.emit("alert", "wrongMomentForKick");
        }
    });
}
function checkIfAllowed(roomState, sessionId) {
    const clientIsAdmin = roomState.players[sessionId].isAdmin;
    return clientIsAdmin && checkIfDuringRoundBeginning(roomState);
}
function checkIfDuringRoundBeginning(roomState) {
    return roomState.roundAdvancement === 1 && roomState.roundPhase === "pre round";
}

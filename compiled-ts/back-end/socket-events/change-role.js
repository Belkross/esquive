import { getSocketRoom } from "../../functions/get-socket-room.js";
export function changeRole(server) {
    const { socket, io, sessionId } = server;
    socket.on("changeRole", (team, role) => {
        const { roomName, roomState } = getSocketRoom(server);
        if (actionAllowed(roomState)) {
            roomState.changeRole({ sessionId, newTeam: team, newRole: role });
            io.in(roomName).emit("roomStateUpdate", roomState);
        }
    });
}
function actionAllowed(roomState) {
    const roundPhase = roomState.roundPhase;
    return roundPhase === "pre round" || roundPhase === "trapping";
}

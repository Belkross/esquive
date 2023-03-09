import { checkSubmitedWordValidity } from "../../functions/check-submited-word-validity.js";
import { getPlayerTeam } from "../../functions/get-player-team.js";
import { getSocketRoom } from "../../functions/get-socket-room.js";
export function submitTrap(server) {
    const { io, socket, sessionId } = server;
    socket.on("submitTrap", (word) => {
        const { roomName, roomState } = getSocketRoom(server);
        if (clientIsAllowed(roomState, sessionId, word)) {
            roomState.submitTrap(sessionId, word);
            io.in(roomName).emit("roomStateUpdate", roomState);
        }
        else {
            if (!someSlotAvailable(roomState, sessionId))
                socket.emit("alert", "trapLimitExceeded");
            else if (trapAlreadySubmitted(roomState, sessionId, word))
                socket.emit("alert", "trapAlreadySubmitted");
        }
    });
}
function clientIsAllowed(roomState, sessionId, word) {
    const isTrappingPhase = roomState.roundPhase === "trapping";
    const trapIsValid = checkSubmitedWordValidity(word);
    return (isTrappingPhase &&
        trapIsValid &&
        someSlotAvailable(roomState, sessionId) &&
        !trapAlreadySubmitted(roomState, sessionId, word));
}
function someSlotAvailable(roomState, sessionId) {
    const clientTeam = getPlayerTeam(roomState, sessionId);
    return roomState.trapSlotsUsed(clientTeam) < roomState.trapSlotsProvided;
}
function trapAlreadySubmitted(roomState, sessionId, word) {
    const team = getPlayerTeam(roomState, sessionId);
    return roomState.checkTrapExistence(word, team);
}

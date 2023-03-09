import { checkGuessAttemptsValidity } from "../../functions/check-guess-attempts-validity.js";
import { checkTimerDurationValidity } from "../../functions/check-timer-duration-validity.js";
import { checkTrapSlotsValidity } from "../../functions/check-trap-slots-validity.js";
import { checkWinConditionValidity } from "../../functions/check-win-condition-validity.js";
import { getSocketRoom } from "../../functions/get-socket-room.js";
export function changeRoundSettings(server) {
    const { socket, io, sessionId } = server;
    socket.on("changeRoundSettings", (settings) => {
        const { roomName, roomState } = getSocketRoom(server);
        if (actionAllowed(roomState, sessionId, settings)) {
            roomState.changeRoundSettings(settings);
            io.in(roomName).emit("roomStateUpdate", roomState);
        }
    });
}
function actionAllowed(roomState, sessionId, settings) {
    const { trapSlotProvided, trappingDuration, guessingDuration, guessAttemptProvided, winCondition } = settings;
    const duringPreRoundPhase = roomState.roundPhase === "pre round" && roomState.roundAdvancement === 1;
    const clientIsAdmin = roomState.players[sessionId].isAdmin;
    const newTrapSlotProvidedOk = checkTrapSlotsValidity(trapSlotProvided);
    const newTrappingDurationOk = checkTimerDurationValidity(trappingDuration);
    const newGuessingDurationOk = checkTimerDurationValidity(guessingDuration);
    const newGuessAttemptProvidedOk = checkGuessAttemptsValidity(guessAttemptProvided);
    const newWinConditionOk = checkWinConditionValidity(winCondition);
    return (duringPreRoundPhase &&
        clientIsAdmin &&
        newTrapSlotProvidedOk &&
        newTrappingDurationOk &&
        newGuessingDurationOk &&
        newGuessAttemptProvidedOk &&
        newWinConditionOk);
}

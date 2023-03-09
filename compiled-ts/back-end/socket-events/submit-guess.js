import { checkSubmitedWordValidity } from "../../functions/check-submited-word-validity.js";
import { formatStringWithBasicLetters } from "../../functions/format-string-with-basic-letters.js";
import { getPlayerTeam } from "../../functions/get-player-team.js";
import { getSocketRoom } from "../../functions/get-socket-room.js";
export function submitGuess(server) {
    const { io, socket, sessionId } = server;
    socket.on("submitGuess", (word) => {
        const { roomName, roomState } = getSocketRoom(server);
        const guessAlreadySubmitted = checkIfGuessAlreadySubmitted(roomState, sessionId, word);
        if (isAllowed(roomState, sessionId, word) && !guessAlreadySubmitted) {
            roomState.submitGuess(server, word);
            io.in(roomName).emit("roomStateUpdate", roomState);
        }
        else {
            if (guessAlreadySubmitted)
                socket.emit("alert", "guessAlreadySubmitted");
        }
    });
}
function isAllowed(roomState, sessionId, word) {
    const clientTeam = getPlayerTeam(roomState, sessionId);
    const clientIsGuesser = roomState.players[sessionId].role === "guesser";
    const duringHisGuessingPhase = roomState.roundPhase === `guessing ${clientTeam}`;
    const isNotJudgingTrap = !roomState.isJudgingTrap;
    const clientWordValid = checkSubmitedWordValidity(word);
    return clientIsGuesser && duringHisGuessingPhase && isNotJudgingTrap && clientWordValid;
}
function checkIfGuessAlreadySubmitted(roomState, sessionId, word) {
    const clientTeam = getPlayerTeam(roomState, sessionId);
    return roomState.teams[clientTeam].guessAttempts.includes(formatStringWithBasicLetters(word));
}

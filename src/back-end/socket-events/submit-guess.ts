import { checkSubmitedWordValidity } from "../../functions/check-submited-word-validity.js"
import { formatStringWithBasicLetters } from "../../functions/format-string-with-basic-letters.js"
import { getPlayerTeam } from "../../functions/get-player-team.js"
import { getSocketRoom } from "../../functions/get-socket-room.js"
import { sessionNotFound } from "../../functions/session-not-found.js"
import { ServerManager } from "../../types/server.js"
import { RoomState } from "../config/room-state/room-state.js"

export function submitGuess(server: ServerManager) {
  const { io, socket, sessionId } = server

  socket.on("submitGuess", (word) => {
    if (sessionNotFound(server)) return

    const { roomName, roomState } = getSocketRoom(server)
    const guessAlreadySubmitted = checkIfGuessAlreadySubmitted(roomState, sessionId, word)

    if (isAllowed(roomState, sessionId, word) && !guessAlreadySubmitted) {
      roomState.submitGuess(server, word)
      io.in(roomName).emit("roomStateUpdate", roomState)
    } else {
      if (guessAlreadySubmitted) socket.emit("alert", "guessAlreadySubmitted")
    }
  })
}

function isAllowed(roomState: RoomState, sessionId: string, word: string) {
  const clientTeam = getPlayerTeam(roomState, sessionId)
  const clientIsGuesser = roomState.players[sessionId].role === "guesser"
  const duringHisGuessingPhase = roomState.roundPhase === `guessing ${clientTeam}`
  const isNotJudgingTrap = !roomState.isJudgingTrap
  const clientWordValid = checkSubmitedWordValidity(word)

  return clientIsGuesser && duringHisGuessingPhase && isNotJudgingTrap && clientWordValid
}

function checkIfGuessAlreadySubmitted(roomState: RoomState, sessionId: string, word: string) {
  const clientTeam = getPlayerTeam(roomState, sessionId)
  return roomState.teams[clientTeam].guessAttempts.includes(formatStringWithBasicLetters(word))
}

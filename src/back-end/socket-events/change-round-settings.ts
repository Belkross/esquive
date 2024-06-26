import { checkGuessAttemptsValidity } from "../../functions/check-guess-attempts-validity.js"
import { checkTimerDurationValidity } from "../../functions/check-timer-duration-validity.js"
import { checkTrapSlotsValidity } from "../../functions/check-trap-slots-validity.js"
import { checkWinConditionValidity } from "../../functions/check-win-condition-validity.js"
import { getSocketRoom } from "../../functions/get-socket-room.js"
import { RoundSettings } from "../../types/room-state.js"
import { ServerManager } from "../../types/server.js"
import { RoomState } from "../config/room-state/room-state.js"

export function changeRoundSettings(server: ServerManager) {
  const { socket, io, sessionId } = server

  socket.on("changeRoundSettings", (settings) => {
    const { roomName, roomState } = getSocketRoom(server)

    if (isAllowed(roomState, sessionId, settings)) {
      roomState.changeRoundSettings(settings)
      io.in(roomName).emit("roomStateUpdate", roomState)
    }
  })
}

function isAllowed(roomState: RoomState, sessionId: string, settings: RoundSettings) {
  const { trapSlotProvided, trappingDuration, guessingDuration, guessAttemptProvided, winCondition } = settings

  const duringPreRoundPhase = roomState.roundPhase === "pre round" && roomState.roundAdvancement === 1
  const clientIsAdmin = roomState.players[sessionId].isAdmin
  const newTrapSlotProvidedOk = checkTrapSlotsValidity(trapSlotProvided)
  const newTrappingDurationOk = checkTimerDurationValidity(trappingDuration)
  const newGuessingDurationOk = checkTimerDurationValidity(guessingDuration)
  const newGuessAttemptProvidedOk = checkGuessAttemptsValidity(guessAttemptProvided)
  const newWinConditionOk = checkWinConditionValidity(winCondition)

  return (
    duringPreRoundPhase &&
    clientIsAdmin &&
    newTrapSlotProvidedOk &&
    newTrappingDurationOk &&
    newGuessingDurationOk &&
    newGuessAttemptProvidedOk &&
    newWinConditionOk
  )
}

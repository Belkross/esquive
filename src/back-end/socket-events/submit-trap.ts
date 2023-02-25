import { checkSubmitedWordValidity } from "../../functions/check-submited-word-validity.js"
import { getPlayerTeam } from "../../functions/get-player-team.js"
import { getSocketRoom } from "../../functions/get-socket-room.js"
import { ServerManager } from "../../types/server.js"
import { RoomState } from "../config/room-state/room-state.js"

export function submitTrap(server: ServerManager) {
  const { io, socket, sessionId } = server

  socket.on("submitTrap", (word) => {
    const { roomName, roomState } = getSocketRoom(server)

    if (clientIsAllowed(roomState, sessionId, word)) {
      roomState.submitTrap(sessionId, word)
      io.in(roomName).emit("roomStateUpdate", roomState)
    } else {
      if (!someSlotAvailable(roomState, sessionId)) socket.emit("alert", "trapLimitExceeded")
      else if (trapAlreadySubmitted(roomState, sessionId, word)) socket.emit("alert", "trapAlreadySubmitted")
    }
  })
}

function clientIsAllowed(roomState: RoomState, sessionId: string, word: string) {
  const isTrappingPhase = roomState.roundPhase === "trapping"
  const trapIsValid = checkSubmitedWordValidity(word)

  return (
    isTrappingPhase &&
    trapIsValid &&
    someSlotAvailable(roomState, sessionId) &&
    !trapAlreadySubmitted(roomState, sessionId, word)
  )
}

function someSlotAvailable(roomState: RoomState, sessionId: string) {
  const clientTeam = getPlayerTeam(roomState, sessionId)

  return roomState.trapSlotsUsed(clientTeam) < roomState.trapSlotsProvided
}

function trapAlreadySubmitted(roomState: RoomState, sessionId: string, word: string) {
  const team = getPlayerTeam(roomState, sessionId)
  return roomState.checkTrapExistence(word, team)
}

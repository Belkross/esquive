import { checkSubmitedWordValidity } from "../../functions/check-submited-word-validity.js"
import { getClientTeam } from "../../functions/get-client-team.js"
import { getSocketRoom } from "../../functions/get-socket-room.js"
import { sessionNotFound } from "../../functions/session-not-found.js"
import { ServerManager } from "../../types/server.js"
import { RoomState } from "../config/room-state/room-state.js"

export function submitTrap(server: ServerManager) {
  const { io, socket, sessionId } = server

  socket.on("submitTrap", (word) => {
    if (sessionNotFound(server)) return

    const { roomName, roomState } = getSocketRoom(server)

    if (clientIsAllowed(roomState, sessionId, word)) {
      roomState.submitTrap(sessionId, word)
      io.in(roomName).emit("roomStateUpdate", roomState)
    } else {
      if (!someSlotAvailable(roomState, sessionId)) socket.emit("alert", "trapLimitExceeded")
    }
  })
}

function clientIsAllowed(roomState: RoomState, sessionId: string, word: string) {
  const isTrappingPhase = roomState.roundPhase === "trapping"
  const trapIsValid = checkSubmitedWordValidity(word)

  return isTrappingPhase && trapIsValid && someSlotAvailable(roomState, sessionId)
}

function someSlotAvailable(roomState: RoomState, sessionId: string) {
  const clientTeam = getClientTeam(roomState, sessionId)

  return roomState.trapSlotsAvailable(clientTeam)
}

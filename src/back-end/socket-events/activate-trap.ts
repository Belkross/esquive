import { getPlayerTeam } from "../../functions/get-player-team.js"
import { getSocketRoom } from "../../functions/get-socket-room.js"
import { sessionNotFound } from "../../functions/session-not-found.js"
import { ServerManager } from "../../types/server.js"
import { RoomState } from "../config/room-state/room-state.js"

export function activateTrap(server: ServerManager) {
  const { socket, io, sessionId } = server

  socket.on("activateTrap", (trap) => {
    if (sessionNotFound(server)) return

    const { roomName, roomState } = getSocketRoom(server)

    if (actionAllowed(roomState, sessionId, trap)) {
      roomState.activateTrap(sessionId, trap)
      io.in(roomName).emit("roomStateUpdate", roomState)
    }
  })
}

function actionAllowed(roomState: RoomState, sessionId: string, trap: string) {
  const clientTeam = getPlayerTeam(roomState, sessionId)
  const opponentTeam = roomState.getOpponentTeam(clientTeam)

  const trapTypeCorrect = typeof trap === "string"
  const trapExist = roomState.checkTrapExistence(trap, clientTeam)
  const duringOpponentGuessingPhase = roomState.roundPhase === `guessing ${opponentTeam}`
  const isNotJudgingTrap = !roomState.isJudgingTrap

  return trapTypeCorrect && trapExist && isNotJudgingTrap && duringOpponentGuessingPhase
}

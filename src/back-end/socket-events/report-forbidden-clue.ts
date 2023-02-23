import { getClientTeam } from "../../functions/get-client-team.js"
import { getSocketRoom } from "../../functions/get-socket-room.js"
import { sessionNotFound } from "../../functions/session-not-found.js"
import { ServerManager } from "../../types/server.js"
import { RoomState } from "../config/room-state/room-state.js"

export function reportForbiddenClue(server: ServerManager) {
  const { socket, io, sessionId } = server

  socket.on("reportForbiddenClue", () => {
    if (sessionNotFound(server)) return

    const { roomName, roomState } = getSocketRoom(server)

    if (actionAllowed(roomState, sessionId)) {
      roomState.reportForbiddenClue(sessionId)
      io.in(roomName).emit("roomStateUpdate", roomState)
    }
  })
}

function actionAllowed(roomState: RoomState, sessionid: string) {
  const clientTeam = getClientTeam(roomState, sessionid)
  const opponentTeam = roomState.getOpponentTeam(clientTeam)
  const duringOpponentGuessingPhase = roomState.roundPhase === `guessing ${opponentTeam}`
  const isNotJudgingTrap = !roomState.isJudgingTrap

  return isNotJudgingTrap && duringOpponentGuessingPhase
}

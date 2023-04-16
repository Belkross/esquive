import { getPlayerTeam } from "../../functions/get-player-team.js"
import { getSocketRoom } from "../../functions/get-socket-room.js"
import { ServerManager } from "../../types/server.js"
import { RoomState } from "../config/room-state/room-state.js"

export function reportForbiddenClue(server: ServerManager) {
  const { socket, io, sessionId } = server

  socket.on("reportForbiddenClue", () => {
    const { roomName, roomState } = getSocketRoom(server)

    if (isAllowed(roomState, sessionId)) {
      roomState.reportForbiddenClue(sessionId)
      io.in(roomName).emit("roomStateUpdate", roomState)
    }
  })
}

function isAllowed(roomState: RoomState, sessionid: string) {
  const clientTeam = getPlayerTeam(roomState, sessionid)
  const opponentTeam = roomState.getOpponentTeam(clientTeam)
  const duringOpponentGuessingPhase = roomState.roundPhase === `guessing ${opponentTeam}`
  const isNotJudgingTrap = !roomState.isJudgingTrap

  return isNotJudgingTrap && duringOpponentGuessingPhase
}

import { getPlayerTeam } from "../../functions/get-player-team.js"
import { getSocketRoom } from "../../functions/get-socket-room.js"
import { ServerManager } from "../../types/server.js"
import { RoomState } from "../config/room-state/room-state.js"

export function cancelTrap(server: ServerManager) {
  const { io, socket, sessionId } = server

  socket.on("cancelTrap", (word) => {
    const { roomName, roomState } = getSocketRoom(server)

    if (isAllowed(roomState, sessionId, word)) {
      roomState.cancelTrap(sessionId, word)
      io.in(roomName).emit("roomStateUpdate", roomState)
    }
  })
}

function isAllowed(roomState: RoomState, sessionId: string, word: string) {
  const clientTeam = getPlayerTeam(roomState, sessionId)

  const duringTrappingPhase = roomState.roundPhase === "trapping"
  const trapExist = roomState.checkTrapExistence(word, clientTeam)

  return duringTrappingPhase && trapExist
}

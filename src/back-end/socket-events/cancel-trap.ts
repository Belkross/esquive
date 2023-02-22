import { getClientTeam } from "../../functions/get-client-team.js"
import { getSocketRoom } from "../../functions/get-socket-room.js"
import { sessionNotFound } from "../../functions/session-not-found.js"
import { ServerManager } from "../../types/server.js"
import { RoomState } from "../config/room-state/room-state.js"

export function cancelTrap(server: ServerManager) {
  const { io, socket, sessionId } = server

  socket.on("cancelTrap", (word) => {
    if (sessionNotFound(server)) return

    const { roomName, roomState } = getSocketRoom(server)

    if (isAllowed(roomState, sessionId, word)) {
      roomState.cancelTrap(sessionId, word)
      io.in(roomName).emit("roomStateUpdate", roomState)
    }
  })
}

function isAllowed(roomState: RoomState, sessionId: string, trapValue: string) {
  const clientTeam = getClientTeam(roomState, sessionId)

  const duringTrappingPhase = roomState.roundPhase === "trapping"
  const trapExist = Object.values(roomState.teams[clientTeam].traps).some((trap) => trap?.value === trapValue)

  return duringTrappingPhase && trapExist
}

import { getPlayerTeam } from "../../functions/get-player-team.js"
import { getSocketRoom } from "../../functions/get-socket-room.js"
import { ServerManager } from "../../types/server.js"
import { RoomState } from "../config/room-state/room-state.js"

export function changeSecretWord(server: ServerManager) {
  const { io, socket, sessionId } = server

  socket.on("changeSecretWord", () => {
    const { roomName, roomState } = getSocketRoom(server)

    if (isAllowed(roomState, sessionId)) {
      roomState.changeSecretWord(sessionId)
      io.in(roomName).emit("roomStateUpdate", roomState)
    }
  })
}

function isAllowed(roomState: RoomState, sessionId: string) {
  const clientTeam = getPlayerTeam(roomState, sessionId)
  const someChangeRemains = roomState.teams[clientTeam].secretWordChangeRemaining > 0
  const duringTrappingPhase = roomState.roundPhase === "trapping"

  return someChangeRemains && duringTrappingPhase
}

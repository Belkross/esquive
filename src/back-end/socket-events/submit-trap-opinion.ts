import { getSocketRoom } from "../../functions/get-socket-room.js"
import { ServerManager } from "../../types/server.js"
import { RoomState } from "../config/room-state/room-state.js"

export function submitTrapOpinion(server: ServerManager) {
  const { io, socket, sessionId } = server

  socket.on("submitTrapOpinion", (trap, opinion) => {
    const { roomName, roomState } = getSocketRoom(server)

    if (isAllowed(roomState, trap, opinion)) {
      roomState.submitTrapOpinion(sessionId, trap, opinion)
      io.in(roomName).emit("roomStateUpdate", roomState)
    }
  })
}

function isAllowed(roomState: RoomState, trap: string, opinion: boolean) {
  const duringTrappingPhase = roomState.roundPhase === "trapping"
  const trapTypeCorrect = typeof trap === "string"
  const opinionTypeCorrect = typeof opinion === "boolean"

  return trapTypeCorrect && opinionTypeCorrect && duringTrappingPhase
}

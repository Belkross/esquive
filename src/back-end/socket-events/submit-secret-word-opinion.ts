import { getSocketRoom } from "../../functions/get-socket-room.js"
import { ServerManager } from "../../types/server.js"
import { RoomState } from "../config/room-state/room-state.js"

export function submitSecretWordOpinion(server: ServerManager) {
  const { io, socket, sessionId } = server

  socket.on("submitSecretWordOpinion", (opinion) => {
    const { roomName, roomState } = getSocketRoom(server)

    if (isAllowed(roomState, opinion)) {
      roomState.submitSecretWordOpinion(sessionId, opinion)
      io.in(roomName).emit("roomStateUpdate", roomState)
    }
  })
}

function isAllowed(roomState: RoomState, opinion: boolean) {
  const opinionTypeCorrect = typeof opinion === "boolean"
  const duringTrappingPhase = roomState.roundPhase === "trapping"

  return opinionTypeCorrect && duringTrappingPhase
}

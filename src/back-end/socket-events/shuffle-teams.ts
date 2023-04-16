import { getSocketRoom } from "../../functions/get-socket-room.js"
import { ServerManager } from "../../types/server.js"
import { RoomState } from "../config/room-state/room-state.js"

export function shuffleTeams(server: ServerManager) {
  const { socket, io, sessionId } = server

  socket.on("shuffleTeams", () => {
    const { roomName, roomState } = getSocketRoom(server)

    if (isAllowed(roomState, sessionId)) {
      roomState.shuffleTeams(sessionId)
      io.in(roomName).emit("roomStateUpdate", roomState)
    }
  })
}

function isAllowed(roomState: RoomState, sessionId: string) {
  const clientIsAdmin = roomState.players[sessionId].isAdmin
  const duringPreRoundPhase = roomState.roundPhase === "pre round"

  return clientIsAdmin && duringPreRoundPhase
}

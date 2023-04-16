import { getSocketRoom } from "../../functions/get-socket-room.js"
import { ServerManager } from "../../types/server.js"
import { RoomState } from "../config/room-state/room-state.js"

export function nextRoundPhase(server: ServerManager) {
  const { io, socket, sessionId } = server

  socket.on("nextRoundPhase", () => {
    const { roomName, roomState } = getSocketRoom(server)

    if (isAllowed(server, roomState)) {
      const clientUsername = roomState.players[sessionId].username
      roomState.configureNextRoundPhase(clientUsername)

      io.in(roomName).emit("roomStateUpdate", roomState)
      roomState.startTimer(io)
    }
  })
}

function isAllowed(server: ServerManager, roomState: RoomState) {
  const clientIsAdmin = roomState.players[server.sessionId].isAdmin

  const roundPhase = roomState.roundPhase
  const duringPassivePhase =
    roundPhase === "pre round" || roundPhase === "pre guessing one" || roundPhase === "pre guessing two"

  return clientIsAdmin && duringPassivePhase
}

import { getSocketRoom } from "../../functions/get-socket-room.js"
import { ServerManager } from "../../types/server.js"
import { sessionNotFound } from "../../functions/session-not-found.js"
import { RoomState } from "../config/room-state/room-state.js"

export function nextRoundPhase(server: ServerManager) {
  const { io, socket, browserId } = server

  socket.on("nextRoundPhase", () => {
    if (sessionNotFound(server)) return
    
    const { roomName, roomState } = getSocketRoom(server)

    if (actionAllowed(server, roomState)) {
      const clientUsername = roomState.players[browserId].username
      roomState.configureNextRoundPhase(clientUsername)

      io.in(roomName).emit("roomStateUpdate", roomState)
      roomState.startTimer(io)
    }
  })
}

function actionAllowed(server: ServerManager, roomState: RoomState) {
  const clientIsAdmin = roomState.players[server.browserId].isAdmin

  const roundPhase = roomState.roundPhase
  const duringPassivePhase =
    roundPhase === "pre round" || roundPhase === "pre guessing one" || roundPhase === "pre guessing two"

  return clientIsAdmin && duringPassivePhase
}

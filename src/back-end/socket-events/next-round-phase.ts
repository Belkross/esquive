import { getSocketData } from "../../functions/get-socket-data.js"
import { ServerManager } from "../../types/server.js"

export function nextRoundPhase(server: ServerManager) {
  const { io, socket } = server
  const { browserId, roomName, roomState } = getSocketData(server)

  socket.on("nextRoundPhase", () => {
    const clientIsAdmin = roomState.players[browserId].isAdmin
    
    const roundPhase = roomState.roundPhase
    const duringPassivePhase =
      roundPhase === "pre round" || roundPhase === "pre guessing one" || roundPhase === "pre guessing two"

    if (clientIsAdmin && duringPassivePhase) {
      const clientUsername = roomState.players[browserId].username
      roomState.configureNextRoundPhase(clientUsername)
      io.in(roomName).emit("roomStateUpdate", roomState)
      roomState.startTimer(io)
    }
  })
}

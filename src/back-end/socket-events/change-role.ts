import { getSocketData } from "../../functions/get-socket-data.js"
import { ServerManager } from "../../types/server.js"

export function changeRole(server: ServerManager) {
  const { socket, io } = server
  const { browserId, roomName, roomState } = getSocketData(server)

  socket.on("changeRole", (team, role) => {
    const roundPhase = roomState.roundPhase
    const notGuessingPhasesYet = roundPhase === "pre round" || roundPhase === "trapping"

    if (notGuessingPhasesYet) {
      roomState.changeRole({ browserId, newTeam: team, newRole: role })
      io.in(roomName).emit("roomStateUpdate", roomState)
    }
  })
}

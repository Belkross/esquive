import { getSocketRoom } from "../../functions/get-socket-room.js"
import { ServerManager } from "../../types/server.js"

export function changeRole(server: ServerManager) {
  const { socket, io, browserId } = server

  socket.on("changeRole", (team, role) => {
    const { roomName, roomState } = getSocketRoom(server)
    const roundPhase = roomState.roundPhase
    const notGuessingPhasesYet = roundPhase === "pre round" || roundPhase === "trapping"

    if (notGuessingPhasesYet) {
      roomState.changeRole({ browserId, newTeam: team, newRole: role })
      io.in(roomName).emit("roomStateUpdate", roomState)
    }
  })
}

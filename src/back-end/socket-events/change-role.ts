import { getSocketRoom } from "../../functions/get-socket-room.js"
import { ServerManager } from "../../types/server.js"
import { RoomState } from "../config/room-state/room-state.js"

export function changeRole(server: ServerManager) {
  const { socket, io, sessionId } = server

  socket.on("changeRole", (team, role) => {
    const { roomName, roomState } = getSocketRoom(server)

    if (isAllowed(roomState)) {
      roomState.changeRole({ sessionId, newTeam: team, newRole: role })
      io.in(roomName).emit("roomStateUpdate", roomState)
    }
  })
}

function isAllowed(roomState: RoomState) {
  const roundPhase = roomState.roundPhase
  return roundPhase === "pre round" || roundPhase === "trapping"
}

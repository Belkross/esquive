import { getSocketRoom } from "../../functions/get-socket-room.js"
import { ServerManager } from "../../types/server.js"
import { sessionNotFound } from "../../functions/session-not-found.js"
import { RoomState } from "../config/room-state/room-state.js"

export function changeRole(server: ServerManager) {
  const { socket, io, sessionId } = server

  socket.on("changeRole", (team, role) => {
    if (sessionNotFound(server)) return

    const { roomName, roomState } = getSocketRoom(server)

    if (actionAllowed(roomState)) {
      roomState.changeRole({ sessionId, newTeam: team, newRole: role })
      io.in(roomName).emit("roomStateUpdate", roomState)
    }
  })
}

function actionAllowed(roomState: RoomState) {
  const roundPhase = roomState.roundPhase
  return roundPhase === "pre round" || roundPhase === "trapping"
}

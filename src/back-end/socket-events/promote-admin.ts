import { getSocketRoom } from "../../functions/get-socket-room.js"
import { ServerManager } from "../../types/server.js"
import { RoomState } from "../config/room-state/room-state.js"

export function promoteAdmin(server: ServerManager) {
  const { socket, io, sessionId } = server

  socket.on("promoteAdmin", (promotedSessionId) => {
    const { roomName, roomState } = getSocketRoom(server)

    if (actionAllowed(roomState, sessionId, promotedSessionId)) {
      roomState.players[promotedSessionId].isAdmin = true
      io.in(roomName).emit("roomStateUpdate", roomState)
    }
  })
}

function actionAllowed(roomState: RoomState, sessionId: string, promotedSessionId: string) {
  const clientIsAdmin = roomState.players[sessionId].isAdmin
  const playerExist = promotedSessionId in roomState.players

  return clientIsAdmin && playerExist
}

import { getSocketRoom } from "../../functions/get-socket-room.js"
import { ServerManager } from "../../types/server.js"
import { RoomState } from "../config/room-state/room-state.js"

export function toggleRoomAccess(server: ServerManager) {
  const { socket, io, sessionId } = server

  socket.on("toggleRoomAccess", () => {
    const { roomName, roomState } = getSocketRoom(server)

    if (actionAllowed(roomState, sessionId)) {
      roomState.roomOpened = !roomState.roomOpened
      io.in(roomName).emit("roomStateUpdate", roomState)
    }
  })
}

function actionAllowed(roomState: RoomState, sessionId: string) {
  return roomState.players[sessionId].isAdmin
}

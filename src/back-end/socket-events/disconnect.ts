import { getSocketRoom } from "../../functions/get-socket-room.js"
import { ServerManager } from "../../types/server"

export function disconnect(server: ServerManager) {
  const { sessions, rooms, io, socket, sessionId } = server

  socket.on("disconnect", (reason) => {
    if (sessions.get(sessionId) === undefined) return //session not found

    const { roomName, roomState } = getSocketRoom(server)
    const nobodyStillPlaying = roomState.getActivePlayerNumber() <= 1
    const clientManuallyDisconnect = reason === "client namespace disconnect"

    if (nobodyStillPlaying) {
      sessions.delete(sessionId)
      rooms.delete(roomName)
      return
    }

    if (clientManuallyDisconnect) {
      roomState.deletePlayer(sessionId)
      sessions.delete(sessionId)
    } else {
      roomState.players[sessionId].connected = false
    }

    io.in(roomName).emit("closeDuplicatedSessions", sessionId)
    io.in(roomName).emit("roomStateUpdate", roomState)
  })
}

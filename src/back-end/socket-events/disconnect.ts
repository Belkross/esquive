import { getSocketRoom } from "../../functions/get-socket-room.js"
import { ServerManager } from "../../types/server"

export function disconnect(server: ServerManager) {
  const { sessions, rooms, io, socket, browserId } = server
  
  socket.on("disconnect", (reason) => {
    const { roomName, roomState } = getSocketRoom(server)
    const nobodyStillPlaying = roomState.getActivePlayerNumber() <= 1
    const clientManuallyDisconnect = reason === "client namespace disconnect"

    if (nobodyStillPlaying) {
      sessions.delete(browserId)
      rooms.delete(roomName)
      return
    }

    if (clientManuallyDisconnect) {
      roomState.deletePlayer(browserId)
      sessions.delete(browserId)
    } else {
      roomState.players[browserId].connected = false
    }

    io.in(roomName).emit("roomStateUpdate", roomState)
  })
}

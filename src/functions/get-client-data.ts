import { ServerManager } from "../types/server.js"

export function getSocketData(server: ServerManager) {
  const { browserId } = server.socket.handshake.auth
  const roomName = server.sessions.get(browserId).roomName
  const roomState = server.rooms.get(roomName)

  return { browserId, roomName, roomState }
}

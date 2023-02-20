import { ServerManager } from "../types/server.js"

export function getSocketRoom(server: ServerManager) {
  const { sessions, rooms, browserId } = server

  const roomName = sessions.get(browserId).roomName
  const roomState = rooms.get(roomName)

  return { roomName, roomState }
}

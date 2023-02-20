import { ServerManager } from "../types/server.js"

export function getSocketRoom(server: ServerManager) {
  const { sessions, rooms, sessionId } = server

  const roomName = sessions.get(sessionId).roomName
  const roomState = rooms.get(roomName)

  return { roomName, roomState }
}

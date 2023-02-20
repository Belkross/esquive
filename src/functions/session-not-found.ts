import { ServerManager } from "../types/server.js"

export function sessionNotFound(server: ServerManager) {
  const { sessions, sessionId, socket } = server
  const sessionNotFound = sessions.get(sessionId) === undefined

  if (sessionNotFound) {
    socket.emit("alert", "sessionNotFound")
    return true
  } else {
    return false
  }
}

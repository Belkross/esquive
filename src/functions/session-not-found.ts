import { ServerManager } from "../types/server.js"

export function sessionNotFound(server: ServerManager) {
  const { sessions, browserId, socket } = server
  const sessionNotFound = sessions.get(browserId) === undefined

  if (sessionNotFound) {
    socket.emit("alert", "sessionNotFound")
    return true
  } else {
    return false
  }
}

import secretWordList from "../../../config/secret-word-list.js"
import { ServerManager } from "../../../types/server.js"
import { logClientEvents } from "./log-client-events.js"
import { updateJoiningPlayerData } from "./update-joining-player-data.js"

export function connection(server: ServerManager) {
  const { io, socket, sessions, rooms, sessionId } = server
  const { username, roomName } = sessions.get(sessionId)
  const roomDoesNotExistYet = rooms.get(roomName) === undefined
  logClientEvents(server, username)

  let roomState

  if (roomDoesNotExistYet) {
    roomState = rooms.add(roomName, secretWordList)
    roomState.addPlayer(sessionId, username)
  } else {
    roomState = rooms.get(roomName)
    updateJoiningPlayerData(roomState, sessionId, username)
    io.to(roomName).emit("roomStateUpdate", roomState)
  }

  socket.join(roomName)
  socket.emit("joinRoom", sessionId, roomState)
}

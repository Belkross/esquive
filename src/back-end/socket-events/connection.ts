import secretWordList from "../../config/secret-word-list.js"
import { ServerManager } from "../../types/type-server.js"
import { RoomState } from "../config/room-state.js"

export function connection(server: ServerManager) {
  const { sessionId } = server.socket.handshake.auth
  const session = server.sessions.get(sessionId)
  if (session === undefined) return

  logClientEvents(server, session.username)

  let roomState = server.rooms.get(session.room)

  if (roomState === undefined) {
    roomState = new RoomState(session.room, secretWordList)
    roomState.addPlayer(sessionId, session.username)
    server.rooms.save(session.room, roomState)
  } else {
    const isInactivePlayer = roomState.players.some((player) => player.sessionId === sessionId)
    if (isInactivePlayer) {
      const indexOfClient = roomState.players.findIndex((player) => player.sessionId === sessionId)
      roomState.players[indexOfClient].connected = true
    } else {
      roomState.addPlayer(sessionId, session.username)
    }
  }

  server.io.to(session.room).emit("roomStateUpdate", roomState)
  server.socket.join(session.room)
  server.socket.emit("joinRoom", {
    sessionId,
    roomState,
    username: session.username,
  })
}

function logClientEvents(server: ServerManager, username: string) {
  server.socket.onAny((eventName, ...args) => {
    console.log(`${username}: ${eventName}`, args)
  })
}

import secretWordList from "../../config/secret-word-list.js"
import { ServerManager } from "../../types/server.js"
import { RoomState } from "../config/room-state.js"

export function connection(server: ServerManager) {
  const { browserId } = server.socket.handshake.auth
  const session = server.sessions.get(browserId)
  if (session === undefined) return

  logClientEvents(server, session.username)

  let roomState = server.rooms.get(session.room)

  if (roomState === undefined) {
    roomState = new RoomState(session.room, secretWordList)
    roomState.addPlayer(browserId, session.username)
    server.rooms.save(session.room, roomState)
  } else {
    const isInactivePlayer = roomState.players.some((player) => player.browserId === browserId)
    if (isInactivePlayer) {
      const indexOfClient = roomState.players.findIndex((player) => player.browserId === browserId)
      roomState.players[indexOfClient].connected = true
    } else {
      roomState.addPlayer(browserId, session.username)
    }
  }

  server.io.to(session.room).emit("roomStateUpdate", roomState)
  server.socket.join(session.room)
  server.socket.emit("joinRoom", {
    browserId,
    roomState,
    username: session.username,
  })
}

function logClientEvents(server: ServerManager, username: string) {
  server.socket.onAny((eventName, ...args) => {
    console.log(`${username}: ${eventName}`, args)
  })
}

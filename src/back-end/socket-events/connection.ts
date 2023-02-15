import secretWordList from "../../config/secret-word-list.js"
import { ServerManager } from "../../types/type-server.js"
import { RoomState } from "../config/room-state.js"

export function connection(server: ServerManager) {
  const session = server.sessions.get(server.socket.handshake.auth.sessionId)

  if (session) {
    server.socket.onAny((eventName, ...args) => {
      console.log(`${session.username}: ${eventName}`, args)
    })

    server.socket.emit("joinRoom", {
      sessionId: server.socket.handshake.auth.sessionId,
      username: session.username,
      roomState: new RoomState(session.room, secretWordList),
    })
    server.socket.join(session.room)
    //TODO: partager à tout le monde l’arrivée d’un nouveau joueur
  }
}

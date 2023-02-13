import { ServerManager } from "../../types/type-server.js"

export default function connection(server: ServerManager) {
  const session = server.sessions.findSession(server.socket.handshake.auth.sessionId)

  if (session) {
    server.socket.emit("joinRoom", {
      sessionId: server.socket.handshake.auth.sessionId,
      username: session.username,
      room: session.room,
      roomState: "roomState",
    })
    server.socket.join(session.room)
      //TODO: partager à tout le monde l’arrivée d’un nouveau joueur
  }
}

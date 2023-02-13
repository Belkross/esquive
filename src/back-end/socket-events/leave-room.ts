import { ServerManager } from "../../types/type-server.js"

export function leaveRoom(server: ServerManager) {
  server.socket.on("leaveRoom", () => {
    //supprimer la session
    server.sessions.delete(server.socket.handshake.auth.sessionId)
    //modifier le roomState
    //envoyer leaveRoom au demandeur
    server.socket.emit("leaveRoom")
    //vérifier si dernier joueur actif de la room
    //si oui suipprimer la room
    //sinon envoyer le nouveau roomState aux joueurs restant dans la room
  })
}

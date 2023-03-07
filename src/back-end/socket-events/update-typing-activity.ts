import { getSocketRoom } from "../../functions/get-socket-room.js"
import { ServerManager } from "../../types/server.js"
import { RoomState } from "../config/room-state/room-state.js"

export function updateTypingActivity(server: ServerManager) {
  const { socket, io, sessionId } = server

  socket.on("updateTypingActivity", (status) => {
    const { roomName, roomState } = getSocketRoom(server)

    if (actionAllowed(roomState, sessionId)) {
      roomState.players[sessionId].isTyping = status
      io.in(roomName).emit("roomStateUpdate", roomState)
    }
  })
}

function actionAllowed(roomState: RoomState, sessionId: string) {
  const clientIsOrator = roomState.players[sessionId].role === "orator"
  const clientTeam = roomState.players[sessionId].team
  const duringClientGuessingPhase = roomState.roundPhase === `guessing ${clientTeam}`

  return duringClientGuessingPhase && clientIsOrator
}

import { RoomState } from "../../config/room-state/room-state.js"

export function updateJoiningPlayerData(roomState: RoomState, sessionId: string, username: string) {
  const isNewPlayer = roomState.players[sessionId] === undefined

  if (isNewPlayer) roomState.addPlayer(sessionId, username)
  else roomState.players[sessionId].connected = true
}

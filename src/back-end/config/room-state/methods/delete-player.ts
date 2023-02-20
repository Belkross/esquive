import { RoomState } from "../room-state.js"

export function deletePlayer(this: RoomState, sessionId: string) {
  delete this.players[sessionId]
}

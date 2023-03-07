import { RoomState } from "../room-state.js"

export function ensureSomeAdminInRoom(this: RoomState) {
  const players = Object.values(this.players)
  const atLeastOneAdmin = players.some((player) => player.isAdmin === true)

  if (!atLeastOneAdmin) {
    for (const sessionId in this.players) {
      this.players[sessionId].isAdmin = true
    }
  }
}

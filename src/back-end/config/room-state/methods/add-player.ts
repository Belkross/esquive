import { PlayerData } from "../player-data.js"
import { RoomState } from "../room-state.js"

export function addPlayer(this: RoomState, sessionId: string, username: string) {
  const playerData = new PlayerData({ sessionId, username, trapSlotLimit: this.trapSlotLimit })

  const isCreatorOfTheRoom = Object.keys(this.players).length === 0
  if (isCreatorOfTheRoom) playerData.isAdmin = true

  this.players[sessionId] = playerData
}

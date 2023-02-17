import { PlayerData } from "../player-data.js"
import { RoomState } from "../room-state.js"

export function addPlayer(this: RoomState, browserId: string, username: string) {
  const playerData = new PlayerData(browserId, username)

  const isCreatorOfTheRoom = Object.keys(this.players).length === 0
  if (isCreatorOfTheRoom) playerData.isAdmin = true

  this.players[browserId] = playerData
}

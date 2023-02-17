import { RoomState } from "../room-state.js"

export function deletePlayer(this: RoomState, browserId: string) {
  delete this.players[browserId]
}

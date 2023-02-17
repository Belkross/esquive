import { RoomState } from "../room-state.js"

export function getActivePlayerNumber(this: RoomState) {
  const players = Object.values(this.players)
  return players.filter((player) => player.connected === true).length
}

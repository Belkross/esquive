import { RoomState } from "../room-state.js"

export function resetTraps(this: RoomState) {
  this.teams.one.traps.length = 0
  this.teams.two.traps.length = 0
}

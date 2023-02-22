import { RoomState } from "../room-state.js"

export function resetTraps(this: RoomState) {
  for(const trapKey in this.teams.one.traps) {
    this.teams.one.traps[trapKey] = undefined
  }
  
  for(const trapKey in this.teams.two.traps) {
    this.teams.two.traps[trapKey] = undefined
  }
}

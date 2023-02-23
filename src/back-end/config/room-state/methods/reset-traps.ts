import { RoomState } from "../room-state.js"

export function resetTraps(this: RoomState) {
  for (const trapKey in this.teams.one.traps) {
    delete this.teams.one.traps[trapKey]
  }

  for (const trapKey in this.teams.two.traps) {
    delete this.teams.two.traps[trapKey]
  }
}

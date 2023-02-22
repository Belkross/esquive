import { Team } from "../../../../types/room-state.js"
import { RoomState } from "../room-state.js"

export function trapSlotsAvailable(this: RoomState, team: Team) {
  let slotsAvailable = 0
  for (const trapKey in this.teams[team].traps) {
    if (this.teams[team].traps[trapKey] === undefined) ++slotsAvailable
  }

  return slotsAvailable
}

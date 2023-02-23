import { Team } from "../../../../types/room-state.js"
import { RoomState } from "../room-state.js"

export function trapSlotsUsed(this: RoomState, team: Team) {
  return Object.keys(this.teams[team].traps).length
}

import { Team } from "../../../../types/room-state.js"
import { RoomState } from "../room-state.js"

export function checkTrapExistence(this: RoomState, word: string, team: Team) {
  const traps = this.teams[team].traps

  for (const trapKey in traps) {
    if (traps[trapKey] === undefined) continue
    if (traps[trapKey]?.value === word) return true
  }

  return false
}

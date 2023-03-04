import { doNothing } from "../../../../functions/do-nothing.js"
import { RoomState } from "../room-state.js"

export function announceTimerStart(this: RoomState, username: string | undefined) {
  if (username === undefined) {
    doNothing()
  } else {
    this.addToHistoric(`${username} démarre le minuteur !`)
  }
}

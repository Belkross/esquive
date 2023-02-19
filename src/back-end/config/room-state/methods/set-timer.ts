import { RoomState } from "../room-state.js"

export function setTimer(this: RoomState, duration: number) {
  this.timer = duration
}

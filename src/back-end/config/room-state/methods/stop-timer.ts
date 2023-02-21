import { RoomState } from "../room-state.js";

export function stopTimer(this: RoomState) {
  this.timerIsRunning = false
}
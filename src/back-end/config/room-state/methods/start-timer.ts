import { Io } from "../../../../types/server.js"
import { RoomState } from "../room-state.js"

export async function startTimer(this: RoomState, io: Io) {
  this.timerIsRunning = true

  await new Promise((resolve /* , reject */) => setTimeout(resolve, 1000)) //avoid the timer to instantly loose a second on activation

  while (this.timerIsRunning && this.timer > 0) {
    --this.timer
    io.in(this.roomName).emit("roomStateUpdate", this)
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  if (this.timer === 0) {
    this.configureNextRoundPhase()
    io.in(this.roomName).emit("roomStateUpdate", this)
  }
}

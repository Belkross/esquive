import { Io } from "../../../../types/server.js"
import { RoomState } from "../room-state.js"

export async function startTimer(this: RoomState, io: Io) {
  this.timerIsRunning = true

  await oneSecond()

  while (this.timerIsRunning && this.timer > 0) {
    --this.timer
    io.in(this.roomName).emit("roomStateUpdate", this)
    await oneSecond()
  }
  if (this.timer === 0) {
    this.configureNextRoundPhase()
    io.in(this.roomName).emit("roomStateUpdate", this)
  }
}

function oneSecond() {
  return new Promise((resolve) => setTimeout(resolve, 1000))
}

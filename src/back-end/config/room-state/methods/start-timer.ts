import { Io } from "../../../../types/server.js"
import { RoomState } from "../room-state.js"

export async function startTimer(this: RoomState, io: Io) {
  this.timerIsRunning = true
  io.in(this.roomName).emit("roomStateUpdate", this) //to allow the client to play a sound
  await oneSecond()

  while (this.timerIsRunning && this.timer > 0) {
    --this.timer
    io.in(this.roomName).emit("roomStateUpdate", this)
    await oneSecond()
  }
  if (this.timer === 0) {
    this.timerIsRunning = false
    this.configureNextRoundPhase()
    io.in(this.roomName).emit("roomStateUpdate", this)
  }
}

function oneSecond() {
  return new Promise((resolve) => setTimeout(resolve, 1000))
}

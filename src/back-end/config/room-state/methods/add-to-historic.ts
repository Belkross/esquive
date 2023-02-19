import { RoomState } from "../room-state.js"

export function addToHistoric(this: RoomState, message: string) {
  this.historic.push(message)

  const historicLimitExceeded = this.historic.length > this.historicLengthLimit
  if (historicLimitExceeded) {
    const numberOfSuppression = this.historic.length - this.historicLengthLimit
    this.historic.splice(0, numberOfSuppression)
  }
}

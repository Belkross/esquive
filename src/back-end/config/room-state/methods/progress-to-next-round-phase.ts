import { RoomState } from "../room-state.js"

export function progressToNextRoundPhase(this: RoomState) {
  switch (this.roundPhase) {
    case "pre round":
      this.roundPhase = "trapping"
      break

    case "trapping":
      this.roundPhase = `pre guessing ${this.startingTeam}`
      break

    case "pre guessing one":
      this.roundPhase = "guessing one"
      break

    case "pre guessing two":
      this.roundPhase = "guessing two"
      break

    case "guessing one":
      this.roundPhase = this.roundAdvancement === this.highestRoundAdvancement ? "pre round" : "pre guessing two"
      break

    case "guessing two":
      this.roundPhase = this.roundAdvancement === this.highestRoundAdvancement ? "pre round" : "pre guessing one"
      break
  }

  incrementRoundAdvancement.call(this)
}

function incrementRoundAdvancement(this: RoomState) {
  if (this.roundAdvancement < this.highestRoundAdvancement) ++this.roundAdvancement
  else this.roundAdvancement = 1
}

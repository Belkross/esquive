import { RoomState } from "../room-state.js"

export function resetSecretWordChangeRemaining(this: RoomState) {
  this.teams.one.secretWordChangeRemaining = this.secretWordChangeLimit
  this.teams.two.secretWordChangeRemaining = this.secretWordChangeLimit
}

import { RoomState } from "../room-state.js";

export function switchStartingTeam(this:RoomState) {
  this.startingTeam = this.startingTeam === "one" ? "two" : "one"
}
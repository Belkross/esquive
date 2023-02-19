import { RoomState } from "../room-state.js"

export function checkIfEndOfMatch(this: RoomState) {
  const teamOneReachedWinCondition = this.teams.one.score >= this.winCondition
  const teamTwoReachedWinCondition = this.teams.two.score >= this.winCondition

  return teamOneReachedWinCondition || teamTwoReachedWinCondition
}

import { randomIntFromInterval } from "../../../../functions/random-int-from-interval.js"
import { PlayerData } from "../player-data.js"
import { RoomState } from "../room-state.js"
const teams = ["one", "two"]

/* If there is only one player in a team, I want to let him the possibility
to test the application */
export function makeSureTeamsHaveOrator(this: RoomState) {
  const players = Object.values(this.players)

  for (const team of teams) {
    const teammates = players.filter((player) => player.team === team)
    const nobodyIsTalker = !teammates.some((player) => player.role === "orator")
    const atLeastTwoPlayersInTheTeam = teammates.length >= 2

    if (nobodyIsTalker && atLeastTwoPlayersInTheTeam) randomPlayerBecomeOrator.call(this, teammates)
  }
}

function randomPlayerBecomeOrator(this: RoomState, teammates: PlayerData[]) {
  const teammatesNumber = teammates.length
  const randomPlayerIndex = randomIntFromInterval(0, teammatesNumber - 1)
  const randomPlayerId = teammates[randomPlayerIndex].browserId

  this.players[randomPlayerId].role = "orator"
}

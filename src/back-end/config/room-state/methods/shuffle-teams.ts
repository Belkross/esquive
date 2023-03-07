import { shuffleArray } from "../../../../functions/shuffle-array.js"
import { RoomState } from "../room-state.js"

export function shuffleTeams(this: RoomState, sessionId: string) {
  const players = Object.keys(this.players)

  const teamValues = players.map((player, index) => {
    const indexIsEven = index % 2 === 0
    return indexIsEven ? "one" : "two"
  })

  const shuffledTeamValues = shuffleArray(teamValues)
  for (const sessionId in this.players) {
    this.players[sessionId].role = "guesser"

    const newTeam = shuffledTeamValues.shift()
    if (newTeam) this.players[sessionId].team = newTeam
  }

  const clientUsername = this.players[sessionId].username
  this.addToHistoric(`${clientUsername} a mélangé les équipes.`)
}

import { Team, Trap } from "../../../types/room-state.js"

export class TeamData {
  readonly color: "indigo" | "rouge"
  readonly opponent: Team
  readonly traps: Trap[] = []
  readonly guessAttempts: string[] = []
  score = 0
  secretWord = ""
  secretWordChangeRemaining = 0
  guessAttemptsRemaining = 0
  hasSucceededGuess: boolean | undefined = undefined

  constructor(team: Team) {
    this.color = team === "one" ? "indigo" : "rouge"
    this.opponent = team === "one" ? "two" : "one"
  }
}

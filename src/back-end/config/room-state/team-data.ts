import { Team, Trap } from "../../../types/room-state.js"

export class TeamData {
  readonly color: "indigo" | "rouge"
  readonly opponent: Team
  readonly traps: {[trapIndex: string]: Trap} = {}
  readonly guessAttempts: string[] = []
  score = 0
  secretWord = ""
  secretWordChangeRemaining = 0
  guessAttemptsRemaining = 0
  hasSucceededGuess: boolean | undefined = undefined

  constructor(team: Team, trapSlotLimit: number) {
    this.color = team === "one" ? "indigo" : "rouge"
    this.opponent = team === "one" ? "two" : "one"
    this.initializeTrapOpinions(trapSlotLimit)
  }

  initializeTrapOpinions(trapSlotLimit: number) {
    for (let trapIndex = 0; trapIndex < trapSlotLimit; ++trapIndex) {
      this.traps[trapIndex.toString()] = undefined
    }
  }
}

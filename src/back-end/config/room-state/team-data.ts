import { Team } from "../../../types/room-state.js"

type Opinions = { [sessionId: string]: boolean | undefined }
export type Trap = { value: string; author: string; opinions: Opinions }
type SecretWord = { value: string; opinions: Opinions }

export class TeamData {
  readonly color: "bleue" | "rouge"
  readonly opponent: Team
  readonly traps: { [trapIndex: string]: Trap } = {}
  readonly guessAttempts: string[] = []
  score = 0
  secretWord: SecretWord = { value: "", opinions: {} }
  secretWordChangeRemaining = 0
  guessAttemptsRemaining = 0
  hasSucceededGuess: boolean | undefined = undefined
  trapped = false

  constructor(team: Team) {
    this.color = team === "one" ? "bleue" : "rouge"
    this.opponent = team === "one" ? "two" : "one"
  }
}

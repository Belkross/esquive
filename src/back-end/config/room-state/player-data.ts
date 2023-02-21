import { Team, Role } from "../../../types/room-state.js"

type ConstructorParams = {
  sessionId: string
  username: string
  trapSlotLimit: number
}

export class PlayerData {
  readonly sessionId: string
  readonly trapOpinions: { [trapIndex: string]: boolean | undefined } = {}
  username: string
  team: Team = "one"
  role: Role = "guesser"
  connected = true
  isAdmin = false
  isTyping = false
  secretWordOpinion: boolean | undefined = undefined

  constructor({ username, sessionId, trapSlotLimit }: ConstructorParams) {
    this.sessionId = sessionId
    this.username = username
    this.initializeTrapOpinions(trapSlotLimit)
  }

  initializeTrapOpinions(trapSlotLimit: number) {
    for (let trapIndex = 0; trapIndex <= trapSlotLimit; ++trapIndex) {
      this.trapOpinions[trapIndex.toString()] = undefined
    }
  }
}

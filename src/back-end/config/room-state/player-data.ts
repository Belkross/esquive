import { Team, Role } from "../../../types/room-state.js"

export class PlayerData {
  readonly browserId: string
  readonly trapOpinions: { [trapIndex: number]: boolean | undefined } = {}
  username: string
  team: Team = "one"
  role: Role = "guesser"
  connected = true
  isAdmin = false
  isTyping = false
  secretWordOpinion: boolean | undefined = undefined

  constructor(browserId: string, username: string) {
    this.browserId = browserId
    this.username = username
  }
}

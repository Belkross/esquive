import { Team, Role } from "../../../types/room-state.js"

export class PlayerData {
  readonly sessionId: string
  username: string
  team: Team = "one"
  role: Role = "guesser"
  connected = true
  isAdmin = false
  isTyping = false

  constructor(sessionId: string, username: string) {
    this.sessionId = sessionId
    this.username = username
  }
}

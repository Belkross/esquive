type Session = {
  username: string
  room: string
}

export default class SessionStorage {
  private sessions = new Map()

  findSession(key: string): Session | undefined {
    return this.sessions.get(key)
  }
  saveSession(sessionId: string, session: Session) {
    this.sessions.set(sessionId, session)
  }
  deleteSession(sessionId: string) {
    this.sessions.delete(sessionId)
  }
}

type Session = {
  username: string
  room: string
}

export class SessionStorage {
  private sessions = new Map()

  get(key: string): Session | undefined {
    return this.sessions.get(key)
  }

  save(sessionId: string, session: Session) {
    return this.sessions.set(sessionId, session)
  }

  delete(sessionId: string) {
    return this.sessions.delete(sessionId)
  }
}

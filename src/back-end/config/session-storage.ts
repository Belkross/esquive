type Session = {
  username: string
  roomName: string
}

export class SessionStorage {
  private readonly storage: { [sessionId: string]: Session } = {}

  add(sessionId: string, username: string, roomName: string) {
    this.storage[sessionId] = { username, roomName }
    return this.storage[sessionId]
  }

  delete(sessionId: string) {
    delete this.storage[sessionId]
  }

  get(sessionId: string) {
    return this.storage[sessionId] || undefined
  }
}

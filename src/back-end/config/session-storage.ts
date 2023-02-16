type Session = {
  browserId: string
  username: string
  roomName: string
}

export class SessionStorage {
  private readonly storage: { [browserId: string]: Session } = {}

  add(browserId: string, username: string, roomName: string) {
    this.storage[browserId] = { browserId, username, roomName }
    return this.storage[browserId]
  }

  delete(browserId: string) {
    delete this.storage[browserId]
  }

  get(browserId: string) {
    return this.storage[browserId] || undefined
  }
}

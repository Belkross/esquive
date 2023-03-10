import { RoomState } from "./room-state/room-state.js"

export class RoomStorage {
  readonly storage: { [roomName: string]: RoomState } = {}
  readonly roomLimit = 30

  add(roomName: string, secretWordList: string) {
    this.storage[roomName] = new RoomState(roomName, secretWordList)
    return this.storage[roomName]
  }

  delete(roomName: string) {
    delete this.storage[roomName]
  }

  get(roomName: string) {
    return this.storage[roomName] || undefined
  }
}

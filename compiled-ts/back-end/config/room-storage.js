import { RoomState } from "./room-state/room-state.js";
export class RoomStorage {
    storage = {};
    roomLimit = 30;
    add(roomName, secretWordList) {
        this.storage[roomName] = new RoomState(roomName, secretWordList);
        return this.storage[roomName];
    }
    delete(roomName) {
        delete this.storage[roomName];
    }
    get(roomName) {
        return this.storage[roomName] || undefined;
    }
}

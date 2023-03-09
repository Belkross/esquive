export class SessionStorage {
    storage = {};
    add(sessionId, username, roomName) {
        this.storage[sessionId] = { username, roomName };
        return this.storage[sessionId];
    }
    delete(sessionId) {
        delete this.storage[sessionId];
    }
    get(sessionId) {
        return this.storage[sessionId] || undefined;
    }
}

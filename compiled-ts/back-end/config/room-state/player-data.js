export class PlayerData {
    sessionId;
    username;
    team = "one";
    role = "guesser";
    connected = true;
    isAdmin = false;
    isTyping = false;
    constructor(sessionId, username) {
        this.sessionId = sessionId;
        this.username = username;
    }
}

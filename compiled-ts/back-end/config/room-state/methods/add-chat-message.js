export class ChatMessage {
    author;
    content;
    date;
    constructor(username, message) {
        this.author = username;
        this.content = message;
        this.date = Date.now();
    }
}
export function addChatMessage(channel, message, sessionId) {
    const author = this.players[sessionId].username;
    const chatMessage = new ChatMessage(author, message);
    if (channel === "general") {
        this.generalMessages.push(chatMessage);
        ensureProperStoredMessageAmount.call(this, this.generalMessages);
    }
    else {
        this.oratorMessages.push(chatMessage);
        ensureProperStoredMessageAmount.call(this, this.oratorMessages);
    }
}
function ensureProperStoredMessageAmount(storage) {
    const storedMessageLimitExceeded = storage.length > this.chatMessagesLengthLimit;
    if (storedMessageLimitExceeded) {
        const numberOfSuppression = storage.length - this.chatMessagesLengthLimit;
        storage.splice(0, numberOfSuppression);
    }
}

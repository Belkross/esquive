import { ChatMessage } from "../../../../functions/chat-message.js"
import { ChatTabId } from "../../../../types/main.js"
import { RoomState } from "../room-state.js"

export function addChatMessage(this: RoomState, channel: ChatTabId, message: string, sessionId: string) {
  const author = this.players[sessionId].username
  const chatMessage = new ChatMessage(author, message)

  if (channel === "general") {
    this.generalMessages.push(chatMessage)
    ensureProperStoredMessageAmount.call(this, this.generalMessages)
  } else {
    this.oratorMessages.push(chatMessage)
    ensureProperStoredMessageAmount.call(this, this.oratorMessages)
  }
}

function ensureProperStoredMessageAmount(this: RoomState, storage: ChatMessage[]) {
  const storedMessageLimitExceeded = storage.length > this.chatMessagesLengthLimit
  if (storedMessageLimitExceeded) {
    const numberOfSuppression = storage.length - this.chatMessagesLengthLimit
    storage.splice(0, numberOfSuppression)
  }
}

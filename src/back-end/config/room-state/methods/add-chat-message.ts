import { ChatChannel } from "../../../../types/main.js"
import { RoomState } from "../room-state.js"

export class ChatMessage {
  author: string
  content: string
  date: number
  constructor(username: string, message: string) {
    this.author = username
    this.content = message
    this.date = Date.now()
  }
}


export function addChatMessage(this: RoomState, channel: ChatChannel, message: string, sessionId: string) {
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

import { CHAT_MESSAGE_MAX_LENGTH } from "../config/app-constants.js"

export default function checkChatMessageValidity(message: unknown) {
  const messageIsNotString = typeof message !== "string"
  if (messageIsNotString) return false

  return message.length > 0 && message.length <= CHAT_MESSAGE_MAX_LENGTH
}

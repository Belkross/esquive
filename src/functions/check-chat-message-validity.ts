import { RoomState } from "../back-end/config/room-state/room-state.js"
import { ChatChannel } from "../types/main.js"

export default function checkChatMessageValidity(message: unknown, channel: ChatChannel) {
  const messageIsNotString = typeof message !== "string"
  if (messageIsNotString) return false

  const characterLimit = channel === "general" ? RoomState.GENERAL_MESSAGE_MAX_LENGTH : RoomState.ORATOR_MESSAGE_MAX_LENGTH

  return message.length > 0 && message.length <= characterLimit
}

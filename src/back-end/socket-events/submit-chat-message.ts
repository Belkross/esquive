import checkChatMessageValidity from "../../functions/check-chat-message-validity.js"
import { getSocketRoom } from "../../functions/get-socket-room.js"
import { ChatChannel } from "../../types/types.js"
import { ServerManager } from "../../types/server.js"

export function submitChatMessage(server: ServerManager) {
  const { socket, io, sessionId } = server

  socket.on("submitChatMessage", (channel, message) => {
    const { roomName, roomState } = getSocketRoom(server)

    if (isAllowed(channel, message)) {
      roomState.addChatMessage(channel, message, sessionId)
      io.in(roomName).emit("roomStateUpdate", roomState)
    }
  })
}

function isAllowed(channel: ChatChannel, message: unknown) {
  const messageIsValid = checkChatMessageValidity(message, channel)

  const channelObject: Record<ChatChannel, undefined> = { general: undefined, orator: undefined }
  const channelPossibilities = Object.keys(channelObject)
  const channelIsValid = channelPossibilities.includes(channel)

  return messageIsValid && channelIsValid
}

import { RoomState } from "../back-end/config/room-state/room-state.js";
export default function checkChatMessageValidity(message) {
    const messageIsNotString = typeof message !== "string";
    if (messageIsNotString)
        return false;
    return message.length > 0 && message.length <= RoomState.CHAT_MESSAGE_MAX_LENGTH;
}

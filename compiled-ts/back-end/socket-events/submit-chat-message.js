import checkChatMessageValidity from "../../functions/check-chat-message-validity.js";
import { getSocketRoom } from "../../functions/get-socket-room.js";
export function submitChatMessage(server) {
    const { socket, io, sessionId } = server;
    socket.on("submitChatMessage", (channel, message) => {
        const { roomName, roomState } = getSocketRoom(server);
        if (actionAllowed(channel, message)) {
            roomState.addChatMessage(channel, message, sessionId);
            io.in(roomName).emit("roomStateUpdate", roomState);
        }
    });
}
function actionAllowed(channel, message) {
    const messageIsValid = checkChatMessageValidity(message);
    const channelObject = { general: undefined, orator: undefined };
    const channelPossibilities = Object.keys(channelObject);
    const channelIsValid = channelPossibilities.includes(channel);
    return messageIsValid && channelIsValid;
}

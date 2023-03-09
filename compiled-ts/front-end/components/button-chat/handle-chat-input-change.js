import { RoomState } from "../../../back-end/config/room-state/room-state.js";
import checkChatMessageValidity from "../../../functions/check-chat-message-validity.js";
export default function handleChatInputChange(event, input, setInput) {
    if (checkIfInputShouldBeIgnored(event, input))
        return;
    const inputValue = event.target.value;
    setInput({
        value: inputValue,
        validity: checkChatMessageValidity(inputValue),
        characterRemaining: RoomState.CHAT_MESSAGE_MAX_LENGTH - inputValue.length,
    });
}
function checkIfInputShouldBeIgnored(event, input) {
    const { inputType } = event.nativeEvent;
    const inputIsNotBackspace = inputType !== "deleteContentBackward";
    const noMoreCharacterRemains = input.characterRemaining <= 0;
    return inputIsNotBackspace && noMoreCharacterRemains;
}

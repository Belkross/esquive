import { ChangeEvent } from "react"
import { RoomState } from "../../../back-end/config/room-state/room-state.js"
import checkChatMessageValidity from "../../../functions/check-chat-message-validity.js"
import { ChatChannel, setState } from "../../../types/main.js"
import { ChatInputState } from "./button-chat-general.js"

export default function handleChatInputChange(
  event: ChangeEvent<HTMLTextAreaElement>,
  input: ChatInputState,
  setInput: setState<ChatInputState>,
  channel: ChatChannel
) {
  if (checkIfInputShouldBeIgnored(event, input)) return

  const characterLimit = channel === "general" ? RoomState.GENERAL_MESSAGE_MAX_LENGTH : RoomState.ORATOR_MESSAGE_MAX_LENGTH
  const inputValue = event.target.value

  setInput({
    value: inputValue,
    validity: checkChatMessageValidity(inputValue, channel),
    characterRemaining: characterLimit - inputValue.length,
  })
}

function checkIfInputShouldBeIgnored(event: ChangeEvent<HTMLTextAreaElement>, input: ChatInputState) {
  const { inputType } = event.nativeEvent as InputEvent

  const inputIsNotBackspace = inputType !== "deleteContentBackward"
  const noMoreCharacterRemains = input.characterRemaining <= 0

  return inputIsNotBackspace && noMoreCharacterRemains
}

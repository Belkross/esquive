import { ChangeEvent } from "react"
import { CHAT_MESSAGE_MAX_LENGTH } from "../../../config/app-constants.js"
import checkChatMessageValidity from "../../../functions/check-chat-message-validity.js"
import { setState } from "../../../types/main.js"
import { ChatInputState } from "./chat-general.js"

export default function handleChatInputChange(
  event: ChangeEvent<HTMLTextAreaElement>,
  input: ChatInputState,
  setInput: setState<ChatInputState>
) {
  if (checkIfInputShouldBeIgnored(event, input)) return

  const inputValue = event.target.value

  setInput({
    value: inputValue,
    validity: checkChatMessageValidity(inputValue),
    characterRemaining: CHAT_MESSAGE_MAX_LENGTH - inputValue.length,
  })
}

function checkIfInputShouldBeIgnored(event: ChangeEvent<HTMLTextAreaElement>, input: ChatInputState) {
  const { inputType } = event.nativeEvent as InputEvent

  const inputIsNotBackspace = inputType !== "deleteContentBackward"
  const noMoreCharacterRemains = input.characterRemaining <= 0

  return inputIsNotBackspace && noMoreCharacterRemains
}

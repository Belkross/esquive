import { List, Stack, TextField, Button } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useRef } from "react"
import { getWhileClientIsOratorAndPlaying } from "../../../functions/get-while-client-is-orator-and-playing.js"
import { AppState, setState } from "../../../types/main.js"
import { socket } from "../../config/initialize-socket-io.js"
import { TitleMenu } from "../button-menu/title-menu.js"
import { ChatInputState } from "./button-chat-general.js"
import { chatOratorInitialInputState } from "./button-chat-orator.js"
import { style_chatInputGroup, style_chatMessageList } from "./chat-general.js"
import handleChatInputChange from "./handle-chat-input-change.js"
import MessageListOrator from "./message-list-orator.js"
import { typingActivity } from "./typing-activity.js"
import { useChatAutoScroll } from "./use-chat-auto-scroll.js"

type Props = {
  appState: AppState
  input: ChatInputState
  setInput: setState<ChatInputState>
}

export function ChatOrator({ appState, input, setInput }: Props) {
  const ulElement = useRef<HTMLUListElement>(null)
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)
  const { roomState } = appState
  const messages = roomState.oratorMessages

  const whileInputsDisplayed = getWhileClientIsOratorAndPlaying(appState)
  const whileInputsAvailable = whileInputsDisplayed && !roomState.isJudgingTrap
  const whileSubmittable = whileInputsAvailable && input.validity

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    handleChatInputChange(event, input, setInput, "orator")
  const handleSubmit = () => {
    if (whileSubmittable) {
      socket.emit("submitChatMessage", "orator", input.value)
      setInput(chatOratorInitialInputState)
    }
  }
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Backspace") return
    if (event.key === "Enter" && whileSubmittable) {
      event.preventDefault() //otherwise handleInputChange is triggered
      handleSubmit()
    } else {
      const clientWereNotTyping = intervalIdRef.current === null
      if (clientWereNotTyping) typingActivity.start(intervalIdRef)
      else typingActivity.reset(intervalIdRef)
    }
  }

  useChatAutoScroll(messages, ulElement)

  return (
    <>
      <TitleMenu>Chat orateur</TitleMenu>

      <List ref={ulElement} dense sx={style_chatMessageList}>
        <MessageListOrator messages={messages} appState={appState} />
      </List>

      {whileInputsDisplayed && (
        <Stack sx={style_chatInputGroup}>
          <TextField
            value={input.value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Envoyer un message"
            multiline
            fullWidth
            helperText={`Caractères restants: ${input.characterRemaining}`}
            disabled={!whileInputsAvailable}
          />
          <Button onClick={handleSubmit} disabled={!whileSubmittable}>
            Envoyer
          </Button>
        </Stack>
      )}
    </>
  )
}

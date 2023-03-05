import { List, Stack, TextField, Button } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useRef } from "react"
import { getWhileClientIsOratorAndPlaying } from "../../../functions/get-while-client-is-orator-and-playing.js"
import { AppState, setState } from "../../../types/main.js"
import { socket } from "../../config/initialize-socket-io.js"
import { TitleMenu } from "../button-menu/title-menu.js"
import { ChatInputState, chatInitialInputState } from "./button-chat.js"
import { style_chatInputGroup, style_chatMessageList } from "./chat-general.js"
import handleChatInputChange from "./handle-chat-input-change.js"
import MessageList from "./message-list.js"
import { useChatAutoScrollDown } from "./use-chat-auto-scroll-down.js"

type Props = {
  appState: AppState
  input: ChatInputState
  setInput: setState<ChatInputState>
}

export function ChatOrator({ appState, input, setInput }: Props) {
  const ulElement = useRef<HTMLUListElement>(null)
  const messages = appState.roomState.oratorMessages

  const whileInputsDisplayed = getWhileClientIsOratorAndPlaying(appState)
  const whileInputsAvailable = whileInputsDisplayed && !appState.roomState.isJudgingTrap
  const whileSubmittable = whileInputsAvailable && input.validity

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => handleChatInputChange(event, input, setInput)
  const handleSubmit = () => {
    if (whileSubmittable) {
      socket.emit("submitChatMessage", "orator", input.value)
      setInput(chatInitialInputState)
    }
  }
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && whileSubmittable) {
      event.preventDefault() //otherwise handleInputChange is triggered
      handleSubmit()
    }
  }

  useChatAutoScrollDown(messages, ulElement)

  return (
    <>
      <TitleMenu>Chat orateur</TitleMenu>

      <List ref={ulElement} dense sx={style_chatMessageList}>
        <MessageList messages={messages} />
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

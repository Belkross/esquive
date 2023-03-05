import { List, Stack, TextField, Button, SxProps } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useRef } from "react"
import { AppState, setState } from "../../../types/main.js"
import { socket } from "../../config/initialize-socket-io.js"
import { TitleMenu } from "../button-menu/title-menu.js"
import { chatInitialInputState, ChatInputState } from "./button-chat.js"
import handleChatInputChange from "./handle-chat-input-change.js"
import MessageList from "./message-list.js"
import { useChatAutoScrollDown } from "./use-chat-auto-scroll-down.js"

type Props = {
  appState: AppState
  input: ChatInputState
  setInput: setState<ChatInputState>
}

export function ChatGeneral({ appState, input, setInput }: Props) {
  const ulElement = useRef<HTMLUListElement>(null)
  const messages = appState.roomState.generalMessages

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => handleChatInputChange(event, input, setInput)
  const handleSubmit = () => {
    if (input.validity) {
      socket.emit("submitChatMessage", "general", input.value)
      setInput(chatInitialInputState)
    }
  }
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && input.validity) {
      event.preventDefault() //otherwise handleInputChange is triggered
      handleSubmit()
    }
  }

  useChatAutoScrollDown(messages, ulElement)

  return (
    <>
      <TitleMenu>Chat général</TitleMenu>

      <List ref={ulElement} dense sx={style_chatMessageList}>
        <MessageList messages={messages} />
      </List>

      <Stack sx={style_chatInputGroup}>
        <TextField
          value={input.value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Envoyer un message"
          multiline
          fullWidth
          helperText={`Caractères restants: ${input.characterRemaining}`}
        />
        <Button onClick={handleSubmit} disabled={!input.validity}>
          Envoyer
        </Button>
      </Stack>
    </>
  )
}

export const style_chatMessageList: SxProps = {
  backgroundColor: "background.default",
  gap: 0,
  overflowY: "scroll",
  overflowWrap: "break-word",
  height: "100%",
  padding: { xs: 1, sm: 2 },
}

export const style_chatInputGroup: SxProps = {
  flexDirection: "column",
  alignItems: { xs: "center", sm: "end" },
  padding: 2,
  gap: 2,
}

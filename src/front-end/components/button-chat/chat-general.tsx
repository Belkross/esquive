import { List, Stack, TextField, Button, SxProps } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react"
import { RoomState } from "../../../back-end/config/room-state/room-state.js"
import { AppState } from "../../../types/main.js"
import { socket } from "../../config/initialize-socket-io.js"
import { TitleMenu } from "../button-menu/title-menu.js"
import handleChatInputChange from "./handle-chat-input-change.js"
import MessageList from "./message-list.js"
import { useChatAutoScrollDown } from "./use-chat-auto-scroll-down.js"

export type ChatInputState = {
  value: string
  validity: boolean
  characterRemaining: number
}

type Props = {  
  appState: AppState
}

export const chatInitialInputState = {
  value: "",
  validity: false,
  characterRemaining: RoomState.CHAT_MESSAGE_MAX_LENGTH,
}

export function ChatGeneral({ appState }: Props) {
  const [input, setInput] = useState<ChatInputState>(chatInitialInputState)
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

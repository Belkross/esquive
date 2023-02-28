import { List, Stack, TextField, Button, SxProps } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react"
import { CHAT_MESSAGE_MAX_LENGTH } from "../../../config/app-constants.js"
import { ChatMessage } from "../../../functions/chat-message.js"
import { ChatChannel } from "../../../types/main.js"
import { socket } from "../../config/initialize-socket-io.js"
import shape from "../../theme/shape.js"
import handleChatInputChange from "./handle-chat-input-change.js"
import MessageList from "./message-list.js"
import { useChatAutoScrollDown } from "./use-chat-auto-scroll-down.js"

export type ChatInputState = {
  value: string
  validity: boolean
  characterRemaining: number
}

type Props = {
  messages: ChatMessage[]
  channel: ChatChannel
}

const initialInputState = {
  value: "",
  validity: false,
  characterRemaining: CHAT_MESSAGE_MAX_LENGTH,
}

export function ChatGeneral({ messages, channel }: Props) {
  const [input, setInput] = useState<ChatInputState>(initialInputState)
  const ulElement = useRef<HTMLUListElement>(null)

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => handleChatInputChange(event, input, setInput)
  const handleSubmit = () => {
    if (input.validity) {
      socket.emit("submitChatMessage", channel, input.value)
      setInput(initialInputState)
    }
  }
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault() //otherwise handleInputChange is triggered
      handleSubmit()
    }
  }

  useChatAutoScrollDown(messages, ulElement)

  return (
    <>
      <List ref={ulElement} dense sx={style_messageList}>
        <MessageList messages={messages} />
      </List>

      <Stack sx={style_stackInputs}>
        <TextField
          value={input.value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Envoyer un message"
          autoFocus
          multiline
          fullWidth
          helperText={`Caractères restants: ${input.characterRemaining}`}
          maxRows={4}
        />
        <Button onClick={handleSubmit} disabled={!input.validity}>
          Envoyer
        </Button>
      </Stack>
    </>
  )
}

const style_messageList: SxProps = {
  backgroundColor: "background.default",
  gap: 0,
  overflowY: "scroll",
  overflowWrap: "break-word",
  height: "100%",
}

const style_stackInputs: SxProps = {
  flexDirection: "column",
  alignItems: { xs: "center", sm: "end" },
  padding: 2,
  paddingBottom: shape.appBarHeight,
  gap: 2,
}

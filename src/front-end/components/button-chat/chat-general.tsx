import { List, Stack, TextField, Button, SxProps, useMediaQuery, useTheme } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useRef } from "react"
import { AppState, FlowlessFunction, setState } from "../../../types/types.js"
import { socket } from "../../config/initialize-socket-io.js"
import ButtonCloseElement from "../button-close-element.js"
import { TitleMenu } from "../button-menu/title-menu.js"
import { ChatInputState, chatInitialInputState } from "./button-chat-general.js"
import handleChatInputChange from "./handle-chat-input-change.js"
import MessageList from "./message-list.js"
import { useChatAutoScroll } from "./use-chat-auto-scroll.js"

type Props = {
  appState: AppState
  input: ChatInputState
  setInput: setState<ChatInputState>
  closeDrawer: FlowlessFunction
}

export function ChatGeneral({ appState, input, setInput, closeDrawer }: Props) {
  const ulElement = useRef<HTMLUListElement>(null)
  const messages = appState.roomState.generalMessages
  const smallScreenLayout = useMediaQuery(useTheme().breakpoints.down("lg"))

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    handleChatInputChange(event, input, setInput, "general")
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

  useChatAutoScroll(messages, ulElement)

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
        <Stack sx={style_buttons}>
          <Button onClick={handleSubmit} disabled={!input.validity}>
            Envoyer
          </Button>
          {smallScreenLayout && <ButtonCloseElement onClick={closeDrawer} />}
        </Stack>
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

const style_buttons: SxProps = {
  flexDirection: "row",
  justifyContent: { xs: "space-between", lg: "end" },
  alignItems: "center",
  width: "100%",
}

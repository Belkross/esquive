import { List, Stack, TextField, Button, SxProps } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react"
import { CHAT_MESSAGE_MAX_LENGTH } from "../../../config/app-constants.js"
import { ChatMessage } from "../../../functions/chat-message.js"
import { getPlayerTeam } from "../../../functions/get-player-team.js"
import { AppState, ChatChannel } from "../../../types/main.js"
import { socket } from "../../config/initialize-socket-io.js"
import shape from "../../theme/shape.js"
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
  messages: ChatMessage[]
  channel: ChatChannel
  appState: AppState
}

const initialInputState = {
  value: "",
  validity: false,
  characterRemaining: CHAT_MESSAGE_MAX_LENGTH,
}

export function ChatChannel({ messages, channel, appState }: Props) {
  const [input, setInput] = useState<ChatInputState>(initialInputState)
  const ulElement = useRef<HTMLUListElement>(null)
  const whileSubmittable = getWhileSubmittable(appState, input, channel)
  const whileTextFieldActive = getWhileTextFieldActive(appState, channel)

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => handleChatInputChange(event, input, setInput)
  const handleSubmit = () => {
    if (whileSubmittable) {
      socket.emit("submitChatMessage", channel, input.value)
      setInput(initialInputState)
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
      <TitleMenu>{channel === "general" ? "Chat Général" : "Chat Orateur"}</TitleMenu>

      <List ref={ulElement} dense sx={style_messageList}>
        <MessageList messages={messages} />
      </List>

      <Stack sx={style_stackInputs}>
        <TextField
          value={input.value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Envoyer un message"
          multiline
          fullWidth
          helperText={`Caractères restants: ${input.characterRemaining}`}
          maxRows={4}
          disabled={!whileTextFieldActive}
        />
        <Button onClick={handleSubmit} disabled={!whileSubmittable}>
          Envoyer
        </Button>
      </Stack>
    </>
  )
}

function getWhileSubmittable(appState: AppState, input: ChatInputState, channel: ChatChannel) {
  if (channel === "orator") {
    const { roomState, sessionId } = appState
    const clientIsOrator = roomState.players[sessionId].role === "orator"
    const clientTeam = getPlayerTeam(roomState, sessionId)
    const duringHisGuessingPhase = roomState.roundPhase === `guessing ${clientTeam}`
    return clientIsOrator && duringHisGuessingPhase && input.validity
  } else {
    return input.validity
  }
}

function getWhileTextFieldActive(appState: AppState, channel: ChatChannel) {
  if (channel === "orator") {
    const { roomState, sessionId } = appState
    const clientIsOrator = roomState.players[sessionId].role === "orator"
    const clientTeam = getPlayerTeam(roomState, sessionId)
    const duringHisGuessingPhase = roomState.roundPhase === `guessing ${clientTeam}`

    return clientIsOrator && duringHisGuessingPhase
  } else {
    return true
  }
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

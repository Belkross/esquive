import { List, Stack, TextField, Button, SxProps } from "@mui/material"
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react"
import { ChatMessage } from "../../../back-end/config/room-state/methods/add-chat-message.js"
import { RoomState } from "../../../back-end/config/room-state/room-state.js"
import { getPlayerTeam } from "../../../functions/get-player-team.js"
import { AppState, ChatChannel } from "../../../types/main.js"
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
  messages: ChatMessage[]
  channel: ChatChannel
  appState: AppState
}

const initialInputState = {
  value: "",
  validity: false,
  characterRemaining: RoomState.CHAT_MESSAGE_MAX_LENGTH,
}

export function Chat({ messages, channel, appState }: Props) {
  const [input, setInput] = useState<ChatInputState>(initialInputState)
  const ulElement = useRef<HTMLUListElement>(null)
  const whileSubmittable = getWhileSubmittable(appState, input, channel)
  const whileCanWrite = getWhileTextFieldActive(appState, channel)

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
      <TitleMenu>{channel === "general" ? "Chat général" : "Chat orateur"}</TitleMenu>

      <List ref={ulElement} dense sx={style_messageList}>
        <MessageList messages={messages} />
      </List>

      {whileCanWrite && (
        <Stack sx={style_stackInputs}>
          <TextField
            value={input.value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Envoyer un message"
            multiline
            fullWidth
            helperText={`Caractères restants: ${input.characterRemaining}`}
            disabled={!whileCanWrite}
          />
          <Button onClick={handleSubmit} disabled={!whileSubmittable}>
            Envoyer
          </Button>
        </Stack>
      )}
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
  padding: { xs: 1, sm: 2 },
}

const style_stackInputs: SxProps = {
  flexDirection: "column",
  alignItems: { xs: "center", sm: "end" },
  padding: 2,
  gap: 2,
}

import { Typography, ListItem, ListItemText, SxProps } from "@mui/material"
import { ChatMessage } from "../../../back-end/config/room-state/methods/add-chat-message.js"
import { getPlayingTeam } from "../../../back-end/config/room-state/methods/get-playing-team.js"
import { AppState } from "../../../types/main.js"

type Props = {
  messages: ChatMessage[]
  appState: AppState
}

export default function MessageListOrator({ messages, appState }: Props) {
  const duringGuessingPhase = appState.roomState.roundAdvancement === (4 || 6)
  const oratorIsTyping = checkOratorIsTyping(appState)

  const list_message = messages.map((message, index) => {
    const chatEntrie = (
      <>
        <Typography component="span" sx={style_authorTypo}>{`${message.author}`}</Typography>
        <Typography component="span">{`:\u00A0${message.content}`}</Typography>
      </>
    )

    return (
      <ListItem key={index} sx={style_container}>
        <ListItemText primary={chatEntrie} />
      </ListItem>
    )
  })

  return (
    <>
      {list_message}
      {duringGuessingPhase && (
        <Typography sx={style_typingActivity}>
          {oratorIsTyping ? "L’orateur est en train d’écrire..." : "..."}
        </Typography>
      )}
    </>
  )
}

function checkOratorIsTyping(appState: AppState) {
  const { roomState } = appState
  const duringGuessingPhase = roomState.roundPhase === "guessing one" || roomState.roundPhase === "guessing two"
  if (!duringGuessingPhase) return false

  const playingTeam = getPlayingTeam.call(roomState)
  const players = Object.values(roomState.players)
  const playingOrator = players.find((player) => player.role === "orator" && player.team === playingTeam)

  return playingOrator?.isTyping
}

const style_authorTypo: SxProps = {
  color: "orange",
}

const style_container: SxProps = {
  px: 0,
  py: 0,
}

const style_typingActivity: SxProps = {
  color: "info.main",
}

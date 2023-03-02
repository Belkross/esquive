import { Typography } from "@mui/material"
import { getPlayerTeam } from "../../functions/get-player-team.js"
import { AppState } from "../../types/main.js"

type Props = {
  appState: AppState
}

export function TrapsRemaining({ appState }: Props) {
  const { roomState, sessionId } = appState
  const clientTeam = getPlayerTeam(roomState, sessionId)
  const currentTrapsNumber = Object.keys(roomState.teams[clientTeam].traps).length
  const { trapSlotsProvided } = roomState
  const text = `${currentTrapsNumber} / ${trapSlotsProvided} pièges`

  return <Typography sx={style_container}>{text}</Typography>
}

const style_container = {
  textAlign: "center",
}

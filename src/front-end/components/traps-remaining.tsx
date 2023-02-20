import { Typography } from "@mui/material"
import { getClientTeam } from "../../functions/get-client-team.js"
import { AppState } from "../../types/main.js"

type Props = {
  appState: AppState
}

export function TrapsRemaining({ appState }: Props) {
  const { roomState, sessionId } = appState
  const clientTeam = getClientTeam(roomState, sessionId)
  const traps = roomState.teams[clientTeam].traps
  const currentTrapsNumber = traps.length
  const trapSlotLimit = roomState.trapSlotsProvided
  const text = `${currentTrapsNumber} / ${trapSlotLimit} pièges`

  return <Typography sx={style_container}>{text}</Typography>
}

const style_container = {
  textAlign: "center",
  marginBottom: 1,
}

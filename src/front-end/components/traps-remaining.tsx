import { Typography } from "@mui/material"
import { RoomState } from "../../back-end/config/room-state/room-state.js"
import { getClientTeam } from "../../functions/get-client-team.js"
import { AppState } from "../../types/main.js"
import { Team } from "../../types/room-state.js"

type Props = {
  appState: AppState
}

export function TrapsRemaining({ appState }: Props) {
  const { roomState, sessionId } = appState
  const clientTeam = getClientTeam(roomState, sessionId)
  const currentTrapsNumber = getTrapSlotsUsed(roomState, clientTeam)
  const trapSlotLimit = roomState.trapSlotsProvided
  const text = `${currentTrapsNumber} / ${trapSlotLimit} pièges`

  return <Typography sx={style_container}>{text}</Typography>
}

const style_container = {
  textAlign: "center",
  marginBottom: 1,
}

function getTrapSlotsUsed(roomState: RoomState, team: Team) {
  let slotsUsed = 0
  for (const trapKey in roomState.teams[team].traps) {
    if (roomState.teams[team].traps[trapKey] !== undefined) ++slotsUsed
  }

  return slotsUsed
}

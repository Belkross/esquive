import { Typography, ListItem, ListItemText, List, SxProps } from "@mui/material"
import { getPlayerTeam } from "../../../functions/get-player-team.js"
import { AppState } from "../../../types/types.js"
import { ButtonActivateTrap } from "../button-activate-trap.js"
import ButtonCancelTrap from "../button-cancel-trap.js"
import { ButtonsVoteTrap } from "./buttons-vote-trap.js"

type Props = {
  appState: AppState
}

export function Traps({ appState }: Props) {
  const { roomState, sessionId } = appState
  const team = getPlayerTeam(roomState, sessionId)
  const traps = roomState.teams[team].traps

  const list_traps = Object.values(traps).map((trap, index) => {
    if (trap === undefined) return

    const duringTrappingPhase = roomState.roundPhase === "trapping"

    const trapID = index + 1
    const trapValue = `${trapID}\u00A0-\u00A0${trap.value}`
    const trapAuthor = <Typography variant="caption">{trap.author}</Typography>

    return (
      <ListItem key={index} sx={style_listItem}>
        {duringTrappingPhase && <ButtonCancelTrap trap={trap.value} />}
        {!duringTrappingPhase && <ButtonActivateTrap appState={appState} trap={trap.value} />}

        <ListItemText primary={trapValue} secondary={trapAuthor} />
        {duringTrappingPhase && <ButtonsVoteTrap trap={trap.value} appState={appState} />}
      </ListItem>
    )
  })

  return <List sx={style_container}>{list_traps}</List>
}

const style_container: SxProps = {
  display: "flex",
  flexFlow: "column nowrap",
  gap: 0.2,
}

const style_listItem: SxProps = {
  gap: 1,
  padding: 0,
}

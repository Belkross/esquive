import { Typography, ListItem, ListItemText, List } from "@mui/material"
import { getClientTeam } from "../../../functions/get-client-team.js"
import { AppState } from "../../../types/main.js"
import { ButtonActivateTrap } from "../button-activate-trap.js"
import ButtonCancelTrap from "../button-cancel-trap.js"
import { ButtonsVoteTrap } from "./buttons-vote-trap.js"

type Props = {
  appState: AppState
}

export function Traps({ appState }: Props) {
  const { roomState, browserId } = appState
  const team = getClientTeam(roomState, browserId)
  const traps = roomState.teams[team].traps

  const list_traps = traps.map((trap, index) => {
    const duringTrappingPhase = roomState.roundPhase === "trapping"

    const trapID = index + 1
    const trapValue = `${trapID} - ${trap.value}`
    const trapAuthor = <Typography variant="caption">{trap.author}</Typography>

    return (
      <ListItem key={index} sx={style_container}>
        {duringTrappingPhase && <ButtonCancelTrap index={index} />}
        {!duringTrappingPhase && <ButtonActivateTrap appState={appState} index={index} />}

        <ListItemText primary={trapValue} secondary={trapAuthor} />
        {duringTrappingPhase && <ButtonsVoteTrap index={index} appState={appState} />}
      </ListItem>
    )
  })

  return <List>{list_traps}</List>
}

const style_container = {
  gap: 1,
  px: 2,
}

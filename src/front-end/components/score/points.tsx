import { SxProps } from "@mui/material"
import Typography from "@mui/material/Typography"
import { AppState } from "../../../types/types.js"
import { Team } from "../../../types/room-state.js"

type Props = {
  team: Team
  appState: AppState
}

export function Points({ team, appState }: Props) {
  const score = appState.roomState.teams[team].score

  return <Typography sx={style_score(team)}>{score}</Typography>
}

const style_score = (team: Team): SxProps => ({
  color: `team.${team}`,
  fontSize: "30px",
  fontWeight: 900,
})

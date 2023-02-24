import Typography from "@mui/material/Typography"
import { RoomState } from "../../../back-end/config/room-state/room-state.js"
import { Team } from "../../../types/room-state.js"

type Props = {
  team: Team
  roomState: RoomState
}

export function Points({ team, roomState }: Props) {
  const score = roomState.teams[team].score

  return (
    <Typography variant="h3" sx={style_score(team)}>
      {score}
    </Typography>
  )
}

const style_score = (team: Team) => ({
  color: `team.${team}`,
})

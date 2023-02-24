import { Typography } from "@mui/material"
import { Team, Role } from "../../../types/room-state.js"

type Props = {
  team: Team
  role: Role
}

export function ButtonChangeRoleTitle({ role, team }: Props) {
  const content = role === "guesser" ? "AUDITEUR" : "ORATEUR"

  return (
    <Typography variant="h3" sx={style_title(team)}>
      {content}
    </Typography>
  )
}

const style_title = (team: Team) => ({
  color: `team.${team}`,
})

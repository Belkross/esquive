import { Typography } from "@mui/material"
import { Team, Role } from "../../../types/room-state.js"

type Props = {
  team: Team
  role: Role
}

export function ButtonChangeRoleTitle({ role, team }: Props) {
  const content = role === "guesser" ? "AUDITEUR" : "ORATEUR"
  const color = team === "one" ? "teamOne.main" : "teamTwo.main"

  return (
    <Typography variant="h3" sx={style_title(color)}>
      {content}
    </Typography>
  )
}

const style_title = (color: string) => ({
  color,
})

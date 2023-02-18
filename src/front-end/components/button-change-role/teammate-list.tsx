import { ListItem, Typography, List, SxProps } from "@mui/material"
import { AppState } from "../../../types/main.js"
import { Team, Role } from "../../../types/room-state.js"

type Props = {
  appState: AppState
  team: Team
  role: Role
}

export function TeammatesList({ team, role, appState }: Props) {
  const { roomState } = appState
  const allPlayersData = Object.values(roomState.players)
  const teammates = allPlayersData.filter((player) => player.team === team && player.role === role)

  const list = teammates.map((player) => {
    const style_typography = player.connected ? style_connected : style_disconnected
    return (
      <ListItem key={player.browserId} sx={style_listItem}>
        <Typography sx={style_typography}>{`${player.username} `}</Typography>
      </ListItem>
    )
  })

  return <List>{list}</List>
}

const style_listItem: SxProps = {
	padding: 0
}

const style_connected: SxProps = {
  textDecorationLine: "none",
}

const style_disconnected: SxProps = {
  textDecorationLine: "line-through",
}

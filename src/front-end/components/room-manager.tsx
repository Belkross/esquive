import { Box, SxProps, Typography } from "@mui/material"
import { PlayerData } from "../../back-end/config/room-state/player-data.js"
import { AppState } from "../../types/main.js"
import { ButtonManagePlayer } from "./button-manage-player.js"

type Props = { appState: AppState }
export function RoomManager({ appState }: Props) {
  const { roomState, sessionId } = appState
  const clientIsAdmin = roomState.players[sessionId].isAdmin

  const players = Object.values(roomState.players)
  const PlayersButtons = players.map((player) => {
    return clientIsAdmin ? (
      <ButtonManagePlayer key={player.sessionId} player={player} />
    ) : (
      <Typography key={player.sessionId} sx={style_typographyPlayer(player)}>
        {player.username}
      </Typography>
    )
  })

  return (
    <>
      <Typography sx={style_title}>Salon: {roomState.roomName}</Typography>
      <Box sx={style_buttons}>{PlayersButtons}</Box>
    </>
  )
}

const style_buttons: SxProps = {
  display: "flex",
  flexFlow: "row wrap",
  gap: 1,
}

const style_typographyPlayer = (player: PlayerData): SxProps => {
  const color = player.isAdmin ? "admin.main" : "primary.main"

  return {
    textDecorationLine: player.connected ? "none" : "line-through",
    padding: 0.5,

    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: color,
    borderRadius: "3px",
  }
}

const style_title: SxProps = {
  marginBottom: 1,
}

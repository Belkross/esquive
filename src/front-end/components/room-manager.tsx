import { Box, SxProps, Typography } from "@mui/material"
import { PlayerData } from "../../back-end/config/room-state/player-data.js"
import { AppState } from "../../types/types.js"
import shape from "../theme/shape.js"
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
        {player.isAdmin ? "*" + player.username : player.username}
      </Typography>
    )
  })

  return (
    <>
      <Typography sx={style_title}>Salon: {roomState.roomName}</Typography>
      <Box sx={style_buttons}>{PlayersButtons}</Box>
      <Typography mt={4}>* hôte de salon</Typography>
    </>
  )
}

const style_buttons: SxProps = {
  display: "flex",
  flexFlow: "row wrap",
  gap: 1,
}

const style_typographyPlayer = (player: PlayerData): SxProps => {
  return {
    textDecorationLine: player.connected ? "none" : "line-through",
    padding: 0.5,

    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "text.primary",
    borderRadius: `${shape.borderRadius}px`,
  }
}

const style_title: SxProps = {
  marginBottom: 1,
}

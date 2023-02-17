import { Stack, SxProps, Typography } from "@mui/material"
import { RoomState } from "../../../back-end/config/room-state/room-state.js"
import { Points } from "./points.js"
import { RoundAdvancementVisual } from "./round-advancement-visual.js"

type Props = {
  roomState: RoomState
}

export function Score({ roomState }: Props) {
  const winCondition = roomState.winCondition

  return (
    <Stack sx={style_container}>
      <Stack sx={style_score}>
        <RoundAdvancementVisual team="one" roomState={roomState} />
        <Points team="one" roomState={roomState} />
        <Typography sx={style_divider}>-</Typography>
        <Points team="two" roomState={roomState} />
        <RoundAdvancementVisual team="two" roomState={roomState} />
      </Stack>
      <Typography>
        Partie en {winCondition} {winCondition > 1 ? "points" : "point"}
      </Typography>
    </Stack>
  )
}

const style_container: SxProps = {
  flexFlow: "row wrap",
  gap: 1,
  justifyContent: "center",
  alignItems: "center",
  mb: { xs: 1, lg: 7 },
}

const style_score: SxProps = {
  flexFlow: "row nowrap",
  alignItems: "center",
  gap: 1,
}

const style_divider: SxProps = {
  fontSize: "30px",
}

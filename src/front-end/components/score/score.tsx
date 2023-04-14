import { Stack, SxProps, Typography } from "@mui/material"
import { AppState } from "../../../types/types.js"
import { Points } from "./points.js"
import { RoundAdvancementVisual } from "./round-advancement-visual.js"

type Props = {
  appState: AppState
}

export function Score({ appState }: Props) {
  const winCondition = appState.roomState.winCondition

  return (
    <Stack sx={style_container}>
      <Stack sx={style_score}>
        <RoundAdvancementVisual team="one" appState={appState} />
        <Points team="one" appState={appState} />
        <Typography sx={style_divider}>-</Typography>
        <Points team="two" appState={appState} />
        <RoundAdvancementVisual team="two" appState={appState} />
      </Stack>
      <Typography>
        Partie en {winCondition} {winCondition > 1 ? "points" : "point"}
      </Typography>
    </Stack>
  )
}

const style_container: SxProps = {
  flexFlow: "column nowrap",
  alignItems: "center",
  gridColumn: "1/13",
  gridRow: "1/2",
}

const style_score: SxProps = {
  flexFlow: "row nowrap",
  alignItems: "center",
  gap: 1,
  marginRight: 1,
}

const style_divider: SxProps = {
  fontSize: "30px",
}

import { Typography, Stack, SxProps } from "@mui/material"
import { grey } from "@mui/material/colors"
import { AppState } from "../../types/main.js"
import shape from "../theme/shape.js"

type Props = {
  appState: AppState
}

export function GameHistoric({ appState }: Props) {
  const { historic } = appState.roomState

  const list_historic = historic.map((message, index) => {
    return <Typography key={index} sx={style_typography}>{`-${message}`}</Typography>
  })

  return <Stack sx={style_container}>{list_historic}</Stack>
}

const style_container: SxProps = {
  backgroundColor: "background.historic",
  borderRadius: shape.borderRadius,
  height: "100%",
  padding: 1,
  boxShadow: 2,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: grey[800],
  overflow: "scroll",
  gap: 0.6,
}

const style_typography: SxProps = {
  fontFamily: "monospace",
}

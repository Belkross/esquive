import { Typography, Stack, SxProps } from "@mui/material"
import { grey } from "@mui/material/colors"
import { AppState } from "../../types/main.js"
import shape from "../theme/shape.js"
const MAX_MESSAGES_DISPLAYED = 10

type Props = {
  appState: AppState
}

export function GameHistoric({ appState }: Props) {
  const roomState = appState.roomState
  const historic = roomState.historic
  const numberOfDisplayedMessages = historic.length >= MAX_MESSAGES_DISPLAYED ? MAX_MESSAGES_DISPLAYED : historic.length
  const slicedHistoric = historic.slice(historic.length - numberOfDisplayedMessages, historic.length)

  const list_historic = slicedHistoric.map((message, index) => {
    return <Typography key={index} sx={style_typography}>{`-${message}`}</Typography>
  })

  return <Stack sx={style_container}>{list_historic}</Stack>
}

const style_container: SxProps = {
  my: 1,
  backgroundColor: "background.historic",
  height: "300px",
  padding: 1,
  boxShadow: 3,
  borderWidth: shape.borderWidth,
  borderStyle: "solid",
  borderColor: grey[800],
}

const style_typography: SxProps = {
  fontFamily: "monospace"
}
import { Typography, Stack, SxProps } from "@mui/material"
import { AppState } from "../../types/main.js"
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
    return <Typography key={index}>{`-${message}`}</Typography>
  })

  return <Stack sx={style_container}>{list_historic}</Stack>
}

const style_container: SxProps = {
  width: "100%",
  my: 1,
}

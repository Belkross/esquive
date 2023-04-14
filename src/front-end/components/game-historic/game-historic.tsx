import { Typography, Stack, SxProps } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useRef } from "react"
import { AppState } from "../../../types/types.js"
import shape from "../../theme/shape.js"
import { useAutoScroll } from "./use-auto-scroll.js"

type Props = {
  appState: AppState
}

export function GameHistoric({ appState }: Props) {
  const { historic } = appState.roomState
  const container = useRef<HTMLUListElement>(null)

  const list_historic = historic.map((message, index) => {
    return <Typography component="li" key={index} sx={style_typography}>{`-${message}`}</Typography>
  })

  useAutoScroll(historic, container)

  return (
    <Stack component="ul" ref={container} sx={style_container}>
      {list_historic}
    </Stack>
  )
}

const style_container: SxProps = {
  backgroundColor: "background.historic",
  borderRadius: shape.borderRadius,
  flexGrow: 1,
  padding: 1,
  boxShadow: 2,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: grey[800],
  margin: 0,
  overflow: "hidden",
}

const style_typography: SxProps = {
  fontFamily: "Courier Prime , monospace",
  fontSize: "0.85rem",
}

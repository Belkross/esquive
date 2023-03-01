import { Stack, SxProps, Typography } from "@mui/material"
import shape from "../../theme/shape.js"

type Props = {
  children: string
}
export function TitleMenu({ children }: Props) {
  return (
    <Stack sx={style_container}>
      <Typography variant="h2">{children}</Typography>
    </Stack>
  )
}

const style_container: SxProps = {
  alignItems: "center",
  justifyContent: "center",
  borderBottomStyle: shape.borderStyle,
  borderBottomWidth: shape.borderWidth,
  borderBottomColor: "background.border",
  height: shape.appBarHeight,
  flexShrink: 0,
}

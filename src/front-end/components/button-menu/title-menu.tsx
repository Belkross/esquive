import { SxProps, Typography } from "@mui/material"
import shape from "../../theme/shape.js"

type Props = {
  children: string
}
export function TitleMenu({ children }: Props) {
  return (
    <Typography variant="h2" sx={style_typography}>
      {children}
    </Typography>
  )
}

const style_typography: SxProps = {
  padding: 2,
  borderBottomStyle: "solid",
  borderBottomWidth: shape.borderWidth,
  borderBottomColor: "background.borderPaper",
  textAlign: "center",
}

import { Box, SxProps } from "@mui/material"
import { ReactNode } from "react"
import shape from "../../theme/shape.js"

type Props = {
  children: ReactNode
  sx?: SxProps
}

export function MenuElementContainer({ children, sx }: Props) {
  return <Box sx={{ ...style_elementContainer, ...sx }}>{children}</Box>
}

const style_elementContainer: SxProps = {
  width: "100%",
  backgroundColor: "background.paper",
  borderBottomStyle: "solid",
  borderBottomWidth: shape.borderWidth,
  borderBottomColor: "background.borderPaper",
  padding: 2,
  textAlign: "center",
}

import { Stack, SxProps } from "@mui/material"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}
export function ScrollableContainer({ children }: Props) {
  return <Stack sx={style_container}>{children}</Stack>
}

const style_container: SxProps = {
  flexFlow: "column nowrap",
  height: "100%",
  backgroundColor: "background.default",
  overflowY: "scroll",
  alignItems: "center",

  gap: { xs: 2, sm: 3, md: 4 },
  px: { xs: 2, sm: 2.5, md: 3 },
  py: { xs: 4, sm: 5 },
}

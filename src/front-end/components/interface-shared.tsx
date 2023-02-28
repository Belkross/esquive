import { Container, SxProps } from "@mui/material"
import { ReactElement } from "react"
import shape from "../theme/shape.js"

type Props = {
  children: ReactElement
}

export function InterfaceShared({ children }: Props) {
  return (
    <>
      <Container sx={style_container}>{children}</Container>
    </>
  )
}

const style_container: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingBottom: shape.appBarHeight,
  paddingTop: { xs: 2, lg: 0 },
  px: { xs: 1.3, sm: 2 },
}

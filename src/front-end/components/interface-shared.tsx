import { Container, SxProps } from "@mui/material"
import { ReactElement } from "react"

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
  flexDirection: { xs: "column-reverse", lg: "column" },
  alignItems: "center",

  width: "100vw",
  height: "100vh",
  maxWidth: { xs: "none" }, //mui set a default max width for the component container
  padding: { xs: 0 },

  overflowY: "hidden",
}

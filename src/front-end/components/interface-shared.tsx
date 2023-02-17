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
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "20cm",
  paddingBottom: { xs: 12, md: 10 },
  paddingTop: 2,
  px: { xs: 1.3, sm: 2 },
}

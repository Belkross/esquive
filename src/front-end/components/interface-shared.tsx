import { ReactElement } from "react"
import Container from "@mui/material/Container"
import { SxProps } from "@mui/material"

type Props = {
  children: ReactElement
}

export default function InterfaceShared({ children }: Props) {
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
  paddingBottom: { xs: 6, md: 10 },
}

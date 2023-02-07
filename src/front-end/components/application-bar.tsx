import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import { SxProps } from "@mui/material"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

export default function ApplicationBar() {
  return (
    <Box sx={style_container}>
      <Typography sx={style_timer}>3:00</Typography>
      <Stack sx={style_stackButtons}>
        <Button>Submit</Button>
        <Button>Chat</Button>
        <Button>Menu</Button>
      </Stack>
    </Box>
  )
}

const style_container: SxProps = {
  display: "flex",
  flexDirection: "row nowrap",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: { xs: 0, md: 3 },
  position: "fixed",
  bottom: "0cm",
  backgroundColor: "background.navBar",
  px: 3,
  py: 1.5,
  boxShadow: 6,
  width: "100%",
}

const style_stackButtons = {
  flexDirection: "row",
  gap: 1,
}

const style_timer: SxProps = {
  fontSize: "30px",
}

import { Box, Button, Stack, SxProps, Typography } from "@mui/material"
import { ButtonMenu } from "./button-menu.js"

export function ApplicationBar() {
  return (
    <Box sx={style_container}>
      <Typography sx={style_timer}>3:00</Typography>
      <Stack sx={style_stackButtons}>
        <Button>Submit</Button>
        <Button>Chat</Button>
        <ButtonMenu />
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

import { Box, Stack, SxProps, Typography } from "@mui/material"
import { RoomState } from "../../back-end/config/room-state.js"
import shape from "../theme/shape.js"
import { ButtonChat } from "./button-chat.js"
import { ButtonMenu } from "./button-menu.js"
import { ButtonSubmitWord } from "./button-submit-word.js"

type Props = {
  roomState: RoomState
}

export function ApplicationBar({ roomState }: Props) {
  return (
    <Box sx={style_container}>
      <Typography sx={style_timer}>3:00</Typography>
      <Stack sx={style_stackButtons}>
        <ButtonSubmitWord roomState={roomState} />
        <ButtonChat roomState={roomState} />
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
  gap: 1.2,
}

const style_timer: SxProps = {
  fontSize: "30px",
  backgroundColor: "background.paper",
  px: 1,
  borderRadius: `${shape.borderRadius}px`,
  boxShadow: 2,
}

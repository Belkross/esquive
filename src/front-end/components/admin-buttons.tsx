import { Stack } from "@mui/material"
import { RoomState } from "../../back-end/config/room-state.js"
import ButtonsJudgeTrap from "./button-judge-trap.js"
import { ButtonPlayNextPhase } from "./button-play-next-phase.js"

type Props = {
  roomState: RoomState
}

export function AdminButtons({ roomState }: Props) {
  return (
    <Stack sx={style_container}>
      <ButtonPlayNextPhase roomState={roomState} />
      <ButtonsJudgeTrap />
    </Stack>
  )
}

const style_container = {
  flexDirection: "row",
  alignSelf: "center",
  gap: { xs: 1, sm: 2 },
}

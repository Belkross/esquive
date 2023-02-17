import { Stack } from "@mui/material"
import { AppState } from "../../types/main.js"
import ButtonsJudgeTrap from "./button-judge-trap.js"
import { ButtonPlayNextPhase } from "./button-play-next-phase.js"

type Props = {
  appState: AppState
}

export function AdminButtons({ appState }: Props) {
  return (
    <Stack sx={style_container}>
      <ButtonPlayNextPhase appState={appState} />
      <ButtonsJudgeTrap />
    </Stack>
  )
}

const style_container = {
  flexDirection: "row",
  alignSelf: "center",
  gap: { xs: 1, sm: 2 },
  my: 1
}

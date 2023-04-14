import ValidateIcon from "@mui/icons-material/Done"
import RefuseIcon from "@mui/icons-material/Close"
import { socket } from "../config/initialize-socket-io.js"
import { AppState } from "../../types/types.js"
import { ButtonResponsive } from "./button-responsive.js"
import { Stack, SxProps } from "@mui/material"

type Props = {
  appState: AppState
}

export function ButtonsJudgeTrap({ appState }: Props) {
  const whileDisabled = getWhileDisabled(appState)

  return (
    <Stack sx={style_container}>
      <ButtonResponsive
        icon={<ValidateIcon />}
        label="Accepter piège"
        onClick={handleClick(true)}
        whileDisabled={whileDisabled}
        sx={style_buttonValidate}
        breakpoint="sm"
      />
      <ButtonResponsive
        icon={<RefuseIcon />}
        label="Refuser piège"
        onClick={handleClick(false)}
        whileDisabled={whileDisabled}
        sx={style_buttonRefuse}
        breakpoint="sm"
      />
    </Stack>
  )
}

function handleClick(judgement: boolean) {
  return () => socket.emit("judgeTrap", judgement)
}

function getWhileDisabled(appState: AppState) {
  const { roomState, sessionId } = appState

  const clientIsAdmin = roomState.players[sessionId].isAdmin
  const isJudgingTrap = roomState.isJudgingTrap

  const roundPhase = roomState.roundPhase
  const duringGuessingPhase = roundPhase === "guessing one" || roundPhase === "guessing two"

  const whileActivated = clientIsAdmin && isJudgingTrap && duringGuessingPhase

  return !whileActivated
}

const style_container: SxProps = {
  flexDirection: "row",
  justifyContent: { xs: "center", lg: "end" },
  gap: 2,
}

const style_buttonValidate: SxProps = {
  backgroundColor: "success.dark",
  borderColor: "success.dark",
}

const style_buttonRefuse: SxProps = {
  backgroundColor: "error.dark",
  borderColor: "error.dark",
}

import ValidateIcon from "@mui/icons-material/Done"
import RefuseIcon from "@mui/icons-material/Close"
import { IconButton } from "@mui/material"
import { socket } from "../config/initialize-socket-io.js"
import { AppState } from "../../types/main.js"

type Props = {
  appState: AppState
}

export function ButtonsJudgeTrap({ appState }: Props) {
  const whileDisabled = getWhileDisabled(appState)

  return (
    <>
      <IconButton sx={style_buttonValidate} disabled={whileDisabled} onClick={handleClick(true)}>
        <ValidateIcon />
      </IconButton>
      <IconButton sx={style_buttonRefuse} disabled={whileDisabled} onClick={handleClick(false)}>
        <RefuseIcon />
      </IconButton>
    </>
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

const style_buttonValidate = {
  backgroundColor: "success.main",
  borderColor: "success.main",
}

const style_buttonRefuse = {
  backgroundColor: "error.main",
  borderColor: "error.main",
}

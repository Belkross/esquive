import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { AppState } from "../../types/main.js"
import { socket } from "../config/initialize-socket-io.js"
import { ButtonResponsive } from "./button-responsive.js"

type Props = {
  appState: AppState
}

const handleClick = () => socket.emit("nextRoundPhase")

export function ButtonPlayNextPhase({ appState }: Props) {
  const whileDisabled = getWhileDisabled(appState)

  return <ButtonResponsive icon={<PlayArrowIcon />} label="Jouer" onClick={handleClick} whileDisabled={whileDisabled} breakpoint="xs"/>
}

function getWhileDisabled(appState: AppState) {
  const { roomState, sessionId } = appState

  const clientIsAdmin = roomState.players[sessionId].isAdmin

  const roundPhase = roomState.roundPhase
  const duringPassivePhase =
    roundPhase === "pre round" || roundPhase === "pre guessing one" || roundPhase === "pre guessing two"

  const whileActivated = clientIsAdmin && duringPassivePhase

  return !whileActivated
}

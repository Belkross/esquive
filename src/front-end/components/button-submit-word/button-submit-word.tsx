import { ButtonResponsive } from "../button-responsive.js"
import EditIcon from "@mui/icons-material/Edit"
import { AppState } from "../../../types/main.js"
import { useTemporaryElement } from "../../custom-hooks/use-temporary-element.js"
import { getPlayerTeam } from "../../../functions/get-player-team.js"
import { ModalSubmitWord } from "./modal-submit-word.js"

type Props = {
  appState: AppState
}

export function ButtonSubmitWord({ appState }: Props) {
  const modal = useTemporaryElement(false)
  const whileDisabled = getWhileDisabled(appState)

  return (
    <>
      <ButtonResponsive icon={<EditIcon />} label="Soumettre un mot" onClick={modal.display} whileDisabled={whileDisabled} />
      <ModalSubmitWord appState={appState} displayed={modal.displayed} close={modal.remove} />
    </>
  )
}

function getWhileDisabled(appState: AppState) {
  const { roomState, sessionId } = appState
  const clientTeam = getPlayerTeam(roomState, sessionId)

  const isTrappingPhase = roomState.roundPhase === "trapping"
  const isClientTurnToGuess = roomState.roundPhase === `guessing ${clientTeam}`
  const clientIsGuesser = roomState.players[sessionId].role === "guesser"
  const isNotJudgingTrap = !roomState.isJudgingTrap

  const whileActivated = isTrappingPhase || (isClientTurnToGuess && clientIsGuesser && isNotJudgingTrap)

  return !whileActivated
}

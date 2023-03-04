import { ButtonResponsive } from "../button-responsive.js"
import EditIcon from "@mui/icons-material/Edit"
import { AppState, FlowlessFunction } from "../../../types/main.js"
import { getWhileModalAllowed } from "../interface-game/get-while-modal-allowed.js"

type Props = {
  openModal: FlowlessFunction
  appState: AppState
}

export function ButtonSubmitWord({ appState, openModal }: Props) {
  const whileActivated = getWhileModalAllowed(appState)

  return (
    <ButtonResponsive
      icon={<EditIcon />}
      label="Soumettre un mot"
      onClick={openModal}
      whileDisabled={!whileActivated}
    />
  )
}

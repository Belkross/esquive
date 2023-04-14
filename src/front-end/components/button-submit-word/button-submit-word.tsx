import { ButtonResponsive } from "../button-responsive.js"
import EditIcon from "@mui/icons-material/Edit"
import { AppState, FlowlessFunction } from "../../../types/types.js"
import { getWhileModalAllowed } from "../interface-game/get-while-modal-allowed.js"
import { useMediaQuery, useTheme } from "@mui/material"

type Props = {
  openModal: FlowlessFunction
  appState: AppState
}

export function ButtonSubmitWord({ appState, openModal }: Props) {
  const whileActivated = getWhileModalAllowed(appState)

  const smallScreen = useMediaQuery(useTheme().breakpoints.down("md"))
  const tooltip = smallScreen ? undefined : "Shift + Entrée"

  return (
    <ButtonResponsive
      icon={<EditIcon />}
      label="Soumettre un mot"
      onClick={openModal}
      whileDisabled={!whileActivated}
      tooltip={tooltip}
    />
  )
}

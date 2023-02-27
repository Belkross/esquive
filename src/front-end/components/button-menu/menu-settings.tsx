import { TextField, Button, SxProps, Typography } from "@mui/material"
import { RoomState } from "../../../back-end/config/room-state/room-state.js"
import { checkGuessAttemptsValidity } from "../../../functions/check-guess-attempts-validity.js"
import { checkTimerDurationValidity } from "../../../functions/check-timer-duration-validity.js"
import { checkTrapSlotsValidity } from "../../../functions/check-trap-slots-validity.js"
import { checkWinConditionValidity } from "../../../functions/check-win-condition-validity.js"
import { AppState, FlowlessFunction } from "../../../types/main.js"
import { RoundSettings, RoundSettingsStructure } from "../../../types/room-state.js"
import { socket } from "../../config/initialize-socket-io.js"
import { useValidNumberInput } from "../../custom-hooks/use-valid-number-input.js"
import shape from "../../theme/shape.js"
import { MenuElementContainer } from "./menu-element-container.js"

type Props = {
  appState: AppState
  closeMenu: FlowlessFunction
}

// prettier-ignore
export function MenuSettings({ appState, closeMenu }: Props) {
  const { roomState, sessionId } = appState
  
  const [trapLimit, onTrapLimitChange] = useValidNumberInput(roomState.trapSlotsProvided, checkTrapSlotsValidity)
  const [guessLimit, onGuessLimitChange] = useValidNumberInput(roomState.guessAttemptsProvided, checkGuessAttemptsValidity)
  const [winCondition, onWinConditionChange] = useValidNumberInput(roomState.winCondition, checkWinConditionValidity)
  const [trappingDuration, onTrappingDurationChange] = useValidNumberInput(roomState.trappingDuration, checkTimerDurationValidity)
  const [guessingDuration, onGuessingDurationChange] = useValidNumberInput(roomState.guessingDuration, checkTimerDurationValidity)

  const whileDisabled = getWhileDisabled(roomState, sessionId)

  const whileSubmittable = trapLimit.validity && guessLimit.validity && winCondition.validity && trappingDuration.validity && guessingDuration.validity && !whileDisabled

  const handleSubmit = () => {
    if (!whileSubmittable) return

    const newSettings = formatNewSettings({
      trapSlotProvided: trapLimit.value,
      guessAttemptProvided: guessLimit.value,
      trappingDuration: trappingDuration.value,
      guessingDuration: guessingDuration.value,
      winCondition: winCondition.value,
    })

    socket.emit("changeRoundSettings", newSettings)
    closeMenu()
  }

  return (
    <>
      <MenuElementContainer>
        <Typography variant="h2">Règlages partie</Typography>
      </MenuElementContainer>

      <MenuElementContainer sx={style_textField}>
        <TextField
          label={`Nombre de piège (${roomState.trapSlotLimit} max)`}
          value={trapLimit.value}
          onChange={onTrapLimitChange}
          error={!trapLimit.validity}
          disabled={whileDisabled}
        />
      </MenuElementContainer>

      <MenuElementContainer sx={style_textField}>
        <TextField
          label={`Nombre de proposition (${roomState.guessAttemptLimit} max)`}
          value={guessLimit.value}
          onChange={onGuessLimitChange}
          error={!guessLimit.validity}
          disabled={whileDisabled}
        />
      </MenuElementContainer>

      <MenuElementContainer sx={style_textField}>
        <TextField
          label={`Condition de victoire (${roomState.winConditionLimit} max)`}
          value={winCondition.value}
          onChange={onWinConditionChange}
          error={!winCondition.validity}
          disabled={whileDisabled}
        />
      </MenuElementContainer>

      <MenuElementContainer sx={style_textField}>
        <TextField
          label={`Durée phase piège (${roomState.timerLimit}s max)`}
          value={trappingDuration.value}
          onChange={onTrappingDurationChange}
          error={!trappingDuration.validity}
          disabled={whileDisabled}
        />
      </MenuElementContainer>

      <MenuElementContainer sx={style_textField}>
        <TextField
          label={`Durée phase oration (${roomState.timerLimit}s max)`}
          value={guessingDuration.value}
          onChange={onGuessingDurationChange}
          error={!guessingDuration.validity}
          disabled={whileDisabled}
        />
      </MenuElementContainer>

      <MenuElementContainer sx={style_button}>
        <Button onClick={handleSubmit} disabled={!whileSubmittable}>
          Valider
        </Button>
      </MenuElementContainer>
    </>
  )
}

function getWhileDisabled(roomState: RoomState, sessionId: string) {
  const duringPreRoundPhase = roomState.roundPhase === "pre round"
  const clientIsAdmin = roomState.players[sessionId].isAdmin === true

  const whileActivated = clientIsAdmin && duringPreRoundPhase

  return !whileActivated
}

function formatNewSettings(settings: RoundSettingsStructure<string>): RoundSettings {
  const { trapSlotProvided, trappingDuration, guessAttemptProvided, guessingDuration, winCondition } = settings

  return {
    trapSlotProvided: Number.parseInt(trapSlotProvided, 10),
    guessAttemptProvided: Number.parseInt(guessAttemptProvided, 10),
    winCondition: Number.parseInt(winCondition, 10),
    trappingDuration: Number.parseInt(trappingDuration, 10),
    guessingDuration: Number.parseInt(guessingDuration, 10),
  }
}

const style_button: SxProps = {
  height: "100%",
  paddingBottom: shape.appBarHeight,
  textAlign: "center",
}

const style_textField: SxProps = {
  textAlign: "center",
  py: 3,
}

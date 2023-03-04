import { Dialog, DialogContent, TextField, Button, SxProps, Typography, useMediaQuery, useTheme } from "@mui/material"
import { KeyboardEvent, useRef } from "react"
import { checkSubmitedWordValidity } from "../../../functions/check-submited-word-validity.js"
import { getPlayerTeam } from "../../../functions/get-player-team.js"
import { AppState, FlowlessFunction } from "../../../types/main.js"
import { socket } from "../../config/initialize-socket-io.js"
import { useValidTextInputWithError } from "../../custom-hooks/use-valid-text-input-with-error.js"
import shape from "../../theme/shape.js"
import { Score } from "../score/score.js"
import { useAutoCloseWhenTimerEnd } from "./use-auto-close-when-timer-end.js"
import ButtonCloseElement from "../button-close-element.js"
import { getWhileModalAllowed } from "../interface-game/get-while-modal-allowed.js"

type Props = {
  appState: AppState
  displayed: boolean
  close: FlowlessFunction
}
export function ModalSubmitWord({ appState, displayed, close }: Props) {
  const { input, onInputChange, clearInput } = useValidTextInputWithError("", checkSubmitedWordValidity)
  const inputRef = useRef<HTMLInputElement>(null)

  const { roomState } = appState
  const smallScreen = useMediaQuery(useTheme().breakpoints.down("md"))
  const submitionNotAllowed = !input.validity || !getWhileModalAllowed(appState)

  const handleSubmitionWithButton = () => {
    if (submitionNotAllowed) return
    emitEventToServer(appState, input.value)
    clearInput()
    close()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    const pressedEnter = event.key === "Enter"
    const pressedBackspace = event.key === "Backspace"

    if (pressedBackspace || submitionNotAllowed) return
    if (pressedEnter) {
      if (!event.shiftKey) {
        event.preventDefault() //allow the modal to close
        close()
      }
      emitEventToServer(appState, input.value)
      clearInput()
    }
  }

  const handleAnimationEnd = () => inputRef.current?.focus()

  useAutoCloseWhenTimerEnd(roomState.roundPhase, close, clearInput)

  return (
    <Dialog
      open={displayed}
      onClose={close}
      onAnimationEnd={handleAnimationEnd}
      PaperProps={{ sx: style_container }}
      fullScreen={smallScreen}
    >
      <ButtonCloseElement onClick={close} sx={{ alignSelf: "end" }} />

      <Score appState={appState} />

      <DialogContent sx={style_dialogContent}>
        <Typography variant="h3">Proposer un mot</Typography>
        <TextField
          variant="filled"
          value={input.value}
          onChange={onInputChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          disabled={!getWhileModalAllowed(appState)}
          sx={style_textField}
          error={input.error}
          inputRef={inputRef}
        />

        <Button onClick={handleSubmitionWithButton} disabled={!input.validity} sx={style_buttonSubmit(input.error)}>
          Valider
        </Button>

        <Typography variant="caption" mt={2}>
          Shift + Entrée pour soumettre plusieurs mots à la suite.
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

function emitEventToServer(appState: AppState, inputValue: string) {
  const { roomState, sessionId } = appState
  const { roundPhase, roundAdvancement } = roomState

  const isTrappingPhase = roundPhase === "trapping" && roundAdvancement === 2
  const clientGuessingPhase = `guessing ${getPlayerTeam(roomState, sessionId)}`
  const isClientGuessingPhase = roundPhase === clientGuessingPhase && (roundAdvancement === 4 || roundAdvancement === 6)

  if (isTrappingPhase) socket.emit("submitTrap", inputValue)
  else if (isClientGuessingPhase) socket.emit("submitGuess", inputValue)
}

const style_container: SxProps = {
  gap: 3,

  padding: { xs: 2, sm: 3 },
  backgroundImage: "none",
  borderWidth: shape.borderWidth,
  borderStyle: shape.borderStyle,
  borderColor: "background.border",
}

const style_buttonSubmit = (error: boolean): SxProps => {
  const errorColor = "error.main"
  const errorStyle = { backgroundColor: errorColor, borderColor: errorColor }

  return error ? errorStyle : null
}

const style_textField: SxProps = {
  width: { xs: "220px", sm: "260px" },
}

const style_dialogContent: SxProps = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  alignItems: "center",
}

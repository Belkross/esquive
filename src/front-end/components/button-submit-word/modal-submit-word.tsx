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

type Props = {
  appState: AppState
  displayed: boolean
  close: FlowlessFunction
}
export function ModalSubmitWord({ appState, displayed, close }: Props) {
  const { input, onInputChange, clearInput } = useValidTextInputWithError("", checkSubmitedWordValidity)
  const inputRef = useRef<HTMLInputElement>(null)

  const { roomState, sessionId } = appState
  const roundPhase = roomState.roundPhase
  const roundAdvancement = roomState.roundAdvancement
  const smallScreen = useMediaQuery(useTheme().breakpoints.down("md"))

  const handleSubmit = () => {
    const inputIsNotValid = input.validity === false
    const clientGuessingPhase = `guessing ${getPlayerTeam(roomState, sessionId)}`

    const isTrappingPhase = roundPhase === "trapping" && roundAdvancement === 2
    const isClientGuessingPhase =
      roundPhase === clientGuessingPhase && (roundAdvancement === 4 || roundAdvancement === 6)
    const InvalidRoundPhase = !isTrappingPhase && !isClientGuessingPhase

    if (inputIsNotValid || InvalidRoundPhase) return
    if (isTrappingPhase) socket.emit("submitTrap", input.value)
    else if (isClientGuessingPhase) socket.emit("submitGuess", input.value)
    clearInput()
    close()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    const clientPressEnter = event.keyCode === 13
    const clientPressBackspace = event.keyCode === 8

    if (clientPressBackspace) return
    else if (clientPressEnter) {
      event.preventDefault() //otherwise the input clear but don’t close
      handleSubmit()
    } else {
      //TODO: typing activity feature
    }
  }

  const handleAnimationEnd = () => inputRef.current?.focus()

  useAutoCloseWhenTimerEnd(roundPhase, close, clearInput)

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
          disabled={!displayed}
          sx={style_textField}
          error={input.error}
          inputRef={inputRef}
        />

        <Button onClick={handleSubmit} disabled={!input.validity} sx={style_buttonSubmit(input.error)}>
          Valider
        </Button>
      </DialogContent>
    </Dialog>
  )
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

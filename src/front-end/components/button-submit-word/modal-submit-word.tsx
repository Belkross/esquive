import { Dialog, DialogTitle, DialogContent, TextField, Button, SxProps } from "@mui/material"
import { KeyboardEvent } from "react"
import { checkSubmitedWordValidity } from "../../../functions/check-submited-word-validity.js"
import { getClientTeam } from "../../../functions/get-client-team.js"
import { AppState, FlowlessFunction } from "../../../types/main.js"
import { socket } from "../../config/initialize-socket-io.js"
import { useValidTextInputWithError } from "../../custom-hooks/use-valid-text-input-with-error.js"
import { BadgeGuessRemaining } from "./badge-guess-remaining.js"

type Props = {
  appState: AppState
  displayed: boolean
  close: FlowlessFunction
}
export default function ModalSubmitWord({ appState, displayed, close }: Props) {
  const { input, onInputChange, clearInput } = useValidTextInputWithError("", checkSubmitedWordValidity)
  const { roomState, sessionId } = appState

  const handleSubmit = () => {
    const inputIsNotValid = input.validity === false
    const roundPhase = roomState.roundPhase
    const clientGuessingPhase = `guessing ${getClientTeam(roomState, sessionId)}`

    const isTrappingPhase = roundPhase === "trapping"
    const isClientGuessingPhase = roundPhase === clientGuessingPhase
    const InvalidRoundPhase = roundPhase !== ("trapping" || clientGuessingPhase)

    if (inputIsNotValid || InvalidRoundPhase) return
    if (isTrappingPhase) socket.emit("submitTrap", input.value)
    else if (isClientGuessingPhase) socket.emit("submitGuess", input.value)
    clearInput()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    const clientPressEnter = event.keyCode === 13
    const clientPressBackspace = event.keyCode === 8

    if (clientPressBackspace) return
    else if (clientPressEnter) handleSubmit()
    else {
      //TODO: typing activity feature
    }
  }

  return (
    <Dialog open={displayed} onClose={close}>
      <DialogTitle>Choisissez un pseudo</DialogTitle>
      <DialogContent sx={style_dialogContent}>
        <TextField
          variant="filled"
          label="Écrire un mot"
          value={input.value}
          onChange={onInputChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          disabled={!displayed}
          sx={style_textField}
          error={input.error}
        />
        <BadgeGuessRemaining appState={appState}>
          <Button onClick={handleSubmit} disabled={!input.validity} sx={style_buttonSubmit(input.error)}>
            Valider
          </Button>
        </BadgeGuessRemaining>
      </DialogContent>
    </Dialog>
  )
}

const style_buttonSubmit = (error: boolean): SxProps => {
  const errorColor = "error.main"
  const errorStyle = { backgroundColor: errorColor, borderColor: errorColor }

  return error ? errorStyle : null
}

const style_textField = {
  width: { xs: "220px", sm: "260px" },
}

const style_dialogContent = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  alignItems: "center",
}

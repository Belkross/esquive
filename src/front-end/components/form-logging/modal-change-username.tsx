import { Dispatch, SetStateAction } from "react"
import { AppState, FlowlessFunction } from "../../../types/main"
import { checkUsernameValidity } from "../../../functions/check-username-validity.js"
import { useValidTextInput } from "../../custom-hooks/use-valid-text-input.js"
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@mui/material"
import { RoomState } from "../../../back-end/config/room-state/room-state.js"

type Props = {
  displayed: boolean
  close: FlowlessFunction
  setAppState: Dispatch<SetStateAction<AppState>>
}

export function ModalChangeUsername({ displayed, close, setAppState }: Props) {
  const [input, onInputChange] = useValidTextInput("", checkUsernameValidity)

  const handleSubmit = () => {
    if (input.validity) {
      localStorage.setItem("username", input.value)
      setAppState((prevAppState) => ({ ...prevAppState, username: input.value }))
      close()
    }
  }

  return (
    <Dialog open={displayed} onClose={close}>
      <DialogTitle>Choisissez un pseudo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Votre pseudo doit comporter entre {RoomState.USERNAME_MIN_LENGTH} et {RoomState.USERNAME_MAX_LENGTH} lettres, sans espaces.
        </DialogContentText>
        <TextField autoFocus label="Pseudo" fullWidth variant="standard" value={input.value} onChange={onInputChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} disabled={!input.validity}>
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  )
}

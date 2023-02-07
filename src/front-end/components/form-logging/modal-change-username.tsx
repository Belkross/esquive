import { Dispatch, SetStateAction } from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { AppState, FlowlessFunction } from "../../../types/types"
import { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH } from "../../../config/app-constants"
import checkUsernameValidity from "../../../functions/check-username-validity"
import useValidTextInput from "../../custom-hooks/use-valid-text-input"

type Props = {
  displayed: boolean
  close: FlowlessFunction
  setAppState: Dispatch<SetStateAction<AppState>>
}

export default function ModalChangeUsername({ displayed, close, setAppState }: Props) {
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
          Votre pseudo doit comporter entre {USERNAME_MIN_LENGTH} et {USERNAME_MAX_LENGTH} lettres, sans espaces.
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

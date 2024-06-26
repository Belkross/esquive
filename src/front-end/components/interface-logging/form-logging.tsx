import { InterfaceLoggingProps } from "./interface-logging"
import { Button, Paper, SxProps, TextField, Typography } from "@mui/material"
import { socket } from "../../config/initialize-socket-io"
import { checkRoomValidity } from "../../../functions/check-room-validity.js"
import { checkUsernameValidity } from "../../../functions/check-username-validity.js"
import shape from "../../theme/shape.js"
import { RoomState } from "../../../back-end/config/room-state/room-state.js"
import { useValidTextInputWithError } from "../../custom-hooks/use-valid-text-input-with-error.js"
import { useValidCapitalizedTextInputWithError } from "../../custom-hooks/use-valid-capitalized-text-input-with-error"

export function FormLogging({ appState, setAppState }: InterfaceLoggingProps) {
  const { input: usernameInput, onInputChange: onUsernameInputChange } = useValidTextInputWithError(
    appState.username,
    checkUsernameValidity
  )
  const { input: roomInput, onInputChange: onRoomInputChange } = useValidCapitalizedTextInputWithError(
    "",
    checkRoomValidity
  )

  const handleSubmit = () => {
    if (roomInput.validity && usernameInput.validity) {
      socket.auth = {
        ...socket.auth,
        username: usernameInput.value,
        room: roomInput.value,
      }
      socket.connect()

      setAppState((prevAppState) => ({
        ...prevAppState,
        status: "connectingToSocketIo",
        username: usernameInput.value,
      }))
      localStorage.setItem("username", usernameInput.value)
    }
  }

  return (
    <Paper sx={style_container}>
      <Typography variant="h2">Créer ou rejoindre un salon</Typography>
      <TextField
        label="Pseudo"
        fullWidth
        value={usernameInput.value}
        onChange={onUsernameInputChange}
        helperText={`${RoomState.USERNAME_MIN_LENGTH} à ${RoomState.USERNAME_MAX_LENGTH} lettres`}
        error={usernameInput.error}
      />
      <TextField
        label="Salon"
        fullWidth
        value={roomInput.value}
        onChange={onRoomInputChange}
        helperText={`${RoomState.ROOMNAME_MIN_LENGTH} à ${RoomState.ROOMNAME_MAX_LENGTH} lettres`}
        error={roomInput.error}
      />
      <Button onClick={handleSubmit} disabled={!roomInput.validity || !usernameInput.validity}>
        Valider
      </Button>
    </Paper>
  )
}

const style_container: SxProps = {
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "center",
  gap: 3,

  gridRow: "3/11",
  gridColumn: "1/7",
  justifySelf: "end",
  alignSelf: { lg: "start" },

  maxWidth: { lg: "450px" },
  width: "100%",
  height: { lg: "100%" },
  backgroundImage: "none",
  padding: shape.spacingBase,

  borderRadius: shape.borderRadius,
  borderStyle: shape.borderStyle,
  borderColor: "background.border",
  borderWidth: shape.borderWidth,
}

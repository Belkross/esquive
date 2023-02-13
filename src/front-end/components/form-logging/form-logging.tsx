import { InterfaceLoggingProps } from "../interface-logging/interface-logging"
import { Button, Paper, Stack, SxProps, TextField } from "@mui/material"
import { socket } from "../../config/initialize-socket-io"
import { checkRoomValidity } from "../../../functions/check-room-validity.js"
import { checkUsernameValidity } from "../../../functions/check-username-validity.js"
import { useValidTextInput } from "../../custom-hooks/use-valid-text-input.js"
import { ButtonChangeUsername } from "./button-change-username.js"

export function FormLogging({ appState, setAppState }: InterfaceLoggingProps) {
  const [roomInput, onRoomInputChange] = useValidTextInput("", checkRoomValidity)

  const handleSubmit = () => {
    if (roomInput.validity && checkUsernameValidity(appState.username)) {
      socket.auth = {
        ...socket.auth,
        username: appState.username,
        room: roomInput.value,
      }
      socket.connect()
      setAppState((prevAppState) => ({ ...prevAppState, status: "connectingToSocketIo" }))
    }
  }

  return (
    <Paper sx={style_container}>
      <ButtonChangeUsername appState={appState} setAppState={setAppState} />

      <Stack sx={style_roomForm}>
        <TextField
          label="Créer ou rejoindre un salon"
          value={roomInput.value}
          onChange={onRoomInputChange}
          sx={style_TextField}
        />
        <Button onClick={handleSubmit} disabled={!roomInput.validity}>
          Valider
        </Button>
      </Stack>
    </Paper>
  )
}

const style_roomForm: SxProps = {
  flexDirection: "row",
  gap: 1,
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
}

const style_container: SxProps = {
  display: "flex",
  flexFlow: "column nowrap",
  justifyContent: "center",
  alignItems: "center",
  gap: 3,
  maxWidth: "500px",
  width: "80vw",
  backgroundImage: "none",
  py: { thinest: 2, thin: 4, medium: 6 },
  px: 2,
  mx: 2,
  marginBottom: { xs: 4, md: 6 },
  padding: 3,
}

const style_TextField: SxProps = {
  width: "220px",
}

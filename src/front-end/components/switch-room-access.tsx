import { Switch, FormControlLabel } from "@mui/material"
import { AppState } from "../../types/main.js"
import { socket } from "../config/initialize-socket-io.js"

type Props = {
  appState: AppState
}

export function SwitchRoomAccess({ appState }: Props) {
  const { roomOpened, players } = appState.roomState
  const clientIsAdmin = players[appState.sessionId].isAdmin

  const label = roomOpened ? "Salon ouvert" : "Salon fermé"

  const SwitchVolume = <Switch color="info" checked={roomOpened} onChange={handleChange} />

  return <FormControlLabel control={SwitchVolume} label={label} disabled={!clientIsAdmin} />
}

function handleChange() {
  socket.emit("toggleRoomAccess")
}

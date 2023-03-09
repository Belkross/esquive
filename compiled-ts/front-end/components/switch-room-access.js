import { jsx as _jsx } from "react/jsx-runtime";
import { Switch, FormControlLabel } from "@mui/material";
import { socket } from "../config/initialize-socket-io.js";
export function SwitchRoomAccess({ appState }) {
    const { roomOpened } = appState.roomState;
    const label = roomOpened ? "Salon ouvert" : "Salon fermé";
    const SwitchVolume = _jsx(Switch, { color: "info", checked: roomOpened, onChange: handleChange });
    return _jsx(FormControlLabel, { control: SwitchVolume, label: label });
}
function handleChange() {
    socket.emit("toggleRoomAccess");
}

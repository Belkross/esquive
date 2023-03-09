import { jsx as _jsx } from "react/jsx-runtime";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { Button } from "@mui/material";
import { socket } from "../config/initialize-socket-io.js";
export function ButtonShuffleTeams({ appState }) {
    const whileDisabled = getWhileDisabled(appState);
    return (_jsx(Button, { startIcon: _jsx(ShuffleIcon, {}), onClick: handleClick, disabled: whileDisabled, children: "M\u00E9langer les \u00E9quipes" }));
}
function handleClick() {
    return socket.emit("shuffleTeams");
}
function getWhileDisabled(appState) {
    const { roomState, sessionId } = appState;
    const clientIsAdmin = roomState.players[sessionId].isAdmin;
    const duringPreRoundPhase = roomState.roundPhase === "pre round";
    const whileActivated = clientIsAdmin && duringPreRoundPhase;
    return !whileActivated;
}

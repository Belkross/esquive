import { jsx as _jsx } from "react/jsx-runtime";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { socket } from "../config/initialize-socket-io.js";
import { ButtonResponsive } from "./button-responsive.js";
const handleClick = () => socket.emit("nextRoundPhase");
export function ButtonPlayNextPhase({ appState }) {
    const whileDisabled = getWhileDisabled(appState);
    return _jsx(ButtonResponsive, { icon: _jsx(PlayArrowIcon, {}), label: "Jouer", onClick: handleClick, whileDisabled: whileDisabled, breakpoint: "xs" });
}
function getWhileDisabled(appState) {
    const { roomState, sessionId } = appState;
    const clientIsAdmin = roomState.players[sessionId].isAdmin;
    const roundPhase = roomState.roundPhase;
    const duringPassivePhase = roundPhase === "pre round" || roundPhase === "pre guessing one" || roundPhase === "pre guessing two";
    const whileActivated = clientIsAdmin && duringPassivePhase;
    return !whileActivated;
}

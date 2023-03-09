import { jsx as _jsx } from "react/jsx-runtime";
import ActivateIcon from "@mui/icons-material/Error";
import { IconButton } from "@mui/material";
import { getPlayerTeam } from "../../functions/get-player-team.js";
import { socket } from "../config/initialize-socket-io.js";
export function ButtonActivateTrap({ trap, appState }) {
    const whileDisabled = getWhileDisabled(appState);
    const handleClick = () => socket.emit("activateTrap", trap);
    return (_jsx(IconButton, { disabled: whileDisabled, onClick: handleClick, children: _jsx(ActivateIcon, {}) }));
}
function getWhileDisabled(appState) {
    const { roomState, sessionId } = appState;
    const opponentTeam = getPlayerTeam(roomState, sessionId) === "one" ? "two" : "one";
    const currentRoundPhase = roomState.roundPhase;
    const DuringOpponentGuessingPhase = currentRoundPhase === `guessing ${opponentTeam}`;
    const isNotJudgingTrap = roomState.isJudgingTrap === false;
    const whileActivated = DuringOpponentGuessingPhase && isNotJudgingTrap;
    return !whileActivated;
}

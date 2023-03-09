import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stack, IconButton, Typography } from "@mui/material";
import { getPlayerTeam } from "../../functions/get-player-team.js";
import ActivateIcon from "@mui/icons-material/Error";
import { socket } from "../config/initialize-socket-io.js";
export function ButtonReportForbiddenClue({ appState }) {
    const { roomState, sessionId } = appState;
    const whileDisplayed = getWhileDisplayed(roomState, sessionId);
    const whileDisabled = getWhileDisabled(roomState, sessionId);
    return whileDisplayed ? (_jsxs(Stack, { sx: style_container, children: [_jsx(IconButton, { "aria-label": "Indice d\u2019orateur incorrect", disabled: whileDisabled, onClick: handleClick, children: _jsx(ActivateIcon, {}) }), _jsx(Typography, { children: "Indice d\u2019orateur interdit" })] })) : null;
}
function handleClick() {
    socket.emit("reportForbiddenClue");
}
function getWhileDisplayed(roomState, sessionId) {
    const opponentTeam = getPlayerTeam(roomState, sessionId) === "one" ? "two" : "one";
    return roomState.roundPhase === `guessing ${opponentTeam}`;
}
function getWhileDisabled(roomState, sessionId) {
    const notJudgingTrap = roomState.isJudgingTrap === false;
    const whileActivated = getWhileDisplayed(roomState, sessionId) && notJudgingTrap;
    return !whileActivated;
}
const style_container = {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
    marginBottom: 2,
};

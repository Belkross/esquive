import { jsx as _jsx } from "react/jsx-runtime";
import { Badge, IconButton } from "@mui/material";
import ChangeIcon from "@mui/icons-material/Replay.js";
import { getPlayerTeam } from "../../../functions/get-player-team.js";
import { socket } from "../../config/initialize-socket-io.js";
export function ButtonChangeSecretWord({ appState }) {
    const { roomState, sessionId } = appState;
    const changeRemaining = getChangeRemaining(roomState, sessionId);
    const whileDisabled = getWhileDisabled(roomState, changeRemaining);
    const badgeContent = whileDisabled ? 0 : changeRemaining;
    const handleClick = () => {
        const someChangeRemains = changeRemaining > 0;
        if (someChangeRemains)
            socket.emit("changeSecretWord");
    };
    return (_jsx(Badge, { color: "info", badgeContent: badgeContent, children: _jsx(IconButton, { "aria-label": "changer mot secret", onClick: handleClick, disabled: whileDisabled, children: _jsx(ChangeIcon, {}) }) }));
}
function getChangeRemaining(roomState, sessionId) {
    const clientTeam = getPlayerTeam(roomState, sessionId);
    return roomState.teams[clientTeam].secretWordChangeRemaining;
}
function getWhileDisabled(roomState, changeRemaining) {
    const someChangeRemains = changeRemaining > 0;
    const duringTrappingPhase = roomState.roundPhase === "trapping";
    const whileActivated = duringTrappingPhase && someChangeRemains;
    return !whileActivated;
}

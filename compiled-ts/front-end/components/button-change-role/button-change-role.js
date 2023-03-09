import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getPlayerTeam } from "../../../functions/get-player-team.js";
import { ButtonChangeRoleTitle } from "./title-button-change-role.js";
import { TeammatesList } from "./teammate-list.js";
import { Stack, Button } from "@mui/material";
import { socket } from "../../config/initialize-socket-io.js";
export function ButtonChangeRole({ team, role, appState }) {
    const whileActivated = getWhileActivated(appState, team);
    const whileDisplayed = getWhileDisplayed(appState);
    const handleClick = () => socket.emit("changeRole", team, role);
    return (_jsxs(Stack, { sx: style_container, children: [whileDisplayed && (_jsx(Button, { sx: style_button(team), onClick: handleClick, disabled: !whileActivated, children: "Rejoindre" })), _jsxs(Stack, { children: [_jsx(ButtonChangeRoleTitle, { role: role, team: team }), _jsx(TeammatesList, { team: team, role: role, appState: appState })] })] }));
}
function getWhileActivated(appState, team) {
    const { roomState, sessionId } = appState;
    const roundPhase = roomState.roundPhase;
    const duringPreRound = roundPhase === "pre round";
    const duringTrapping = roundPhase === "trapping";
    const clientTeam = getPlayerTeam(roomState, sessionId);
    const notOpponentTeamButton = clientTeam === team;
    return duringPreRound || (duringTrapping && notOpponentTeamButton);
}
function getWhileDisplayed(appState) {
    const roundPhase = appState.roomState.roundPhase;
    const duringPreRound = roundPhase === "pre round";
    const duringTrapping = roundPhase === "trapping";
    return duringPreRound || duringTrapping;
}
const style_container = {
    flexDirection: "row",
    alignItems: "start",
    gap: 2,
};
const style_button = (team) => {
    const color = `team.${team}`;
    return {
        backgroundColor: color,
        borderColor: color,
        padding: 1,
    };
};

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography, ListItem, ListItemText, List } from "@mui/material";
import { getPlayerTeam } from "../../../functions/get-player-team.js";
import { ButtonActivateTrap } from "../button-activate-trap.js";
import ButtonCancelTrap from "../button-cancel-trap.js";
import { ButtonsVoteTrap } from "./buttons-vote-trap.js";
export function Traps({ appState }) {
    const { roomState, sessionId } = appState;
    const team = getPlayerTeam(roomState, sessionId);
    const traps = roomState.teams[team].traps;
    const list_traps = Object.values(traps).map((trap, index) => {
        if (trap === undefined)
            return;
        const duringTrappingPhase = roomState.roundPhase === "trapping";
        const trapID = index + 1;
        const trapValue = `${trapID}\u00A0-\u00A0${trap.value}`;
        const trapAuthor = _jsx(Typography, { variant: "caption", children: trap.author });
        return (_jsxs(ListItem, { sx: style_listItem, children: [duringTrappingPhase && _jsx(ButtonCancelTrap, { trap: trap.value }), !duringTrappingPhase && _jsx(ButtonActivateTrap, { appState: appState, trap: trap.value }), _jsx(ListItemText, { primary: trapValue, secondary: trapAuthor }), duringTrappingPhase && _jsx(ButtonsVoteTrap, { trap: trap.value, appState: appState })] }, index));
    });
    return _jsx(List, { sx: style_container, children: list_traps });
}
const style_container = {
    display: "flex",
    flexFlow: "column nowrap",
    gap: 0.2,
};
const style_listItem = {
    gap: 1,
    padding: 0,
};

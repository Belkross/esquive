import { jsx as _jsx } from "react/jsx-runtime";
import { Typography } from "@mui/material";
import { getPlayerTeam } from "../../functions/get-player-team.js";
export function TrapsRemaining({ appState }) {
    const { roomState, sessionId } = appState;
    const clientTeam = getPlayerTeam(roomState, sessionId);
    const currentTrapsNumber = Object.keys(roomState.teams[clientTeam].traps).length;
    const { trapSlotsProvided } = roomState;
    const text = `${currentTrapsNumber} / ${trapSlotsProvided} pièges`;
    return _jsx(Typography, { sx: style_container, children: text });
}
const style_container = {
    textAlign: "center",
};

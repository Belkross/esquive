import { jsx as _jsx } from "react/jsx-runtime";
import { ListItem, Typography, List } from "@mui/material";
export function TeammatesList({ team, role, appState }) {
    const { roomState } = appState;
    const allPlayersData = Object.values(roomState.players);
    const teammates = allPlayersData.filter((player) => player.team === team && player.role === role);
    const list = teammates.map((player) => {
        const style_typography = player.connected ? style_connected : style_disconnected;
        return (_jsx(ListItem, { sx: style_listItem, children: _jsx(Typography, { sx: style_typography, children: `${player.username} ` }) }, player.sessionId));
    });
    return _jsx(List, { children: list });
}
const style_listItem = {
    padding: 0
};
const style_connected = {
    textDecorationLine: "none",
};
const style_disconnected = {
    textDecorationLine: "line-through",
};

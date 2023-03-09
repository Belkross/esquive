import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Typography } from "@mui/material";
import shape from "../theme/shape.js";
import { ButtonManagePlayer } from "./button-manage-player.js";
export function RoomManager({ appState }) {
    const { roomState, sessionId } = appState;
    const clientIsAdmin = roomState.players[sessionId].isAdmin;
    const players = Object.values(roomState.players);
    const PlayersButtons = players.map((player) => {
        return clientIsAdmin ? (_jsx(ButtonManagePlayer, { player: player }, player.sessionId)) : (_jsx(Typography, { sx: style_typographyPlayer(player), children: player.isAdmin ? "*" + player.username : player.username }, player.sessionId));
    });
    return (_jsxs(_Fragment, { children: [_jsxs(Typography, { sx: style_title, children: ["Salon: ", roomState.roomName] }), _jsx(Box, { sx: style_buttons, children: PlayersButtons }), _jsx(Typography, { mt: 4, children: "* h\u00F4te de salon" })] }));
}
const style_buttons = {
    display: "flex",
    flexFlow: "row wrap",
    gap: 1,
};
const style_typographyPlayer = (player) => {
    return {
        textDecorationLine: player.connected ? "none" : "line-through",
        padding: 0.5,
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "text.primary",
        borderRadius: shape.borderRadius,
    };
};
const style_title = {
    marginBottom: 1,
};

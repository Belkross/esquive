import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography, ListItem, ListItemText } from "@mui/material";
import { getPlayingTeam } from "../../../back-end/config/room-state/methods/get-playing-team.js";
export default function MessageListOrator({ messages, appState }) {
    const duringGuessingPhase = appState.roomState.roundAdvancement === (4 || 6);
    const oratorIsTyping = checkOratorIsTyping(appState);
    const list_message = messages.map((message, index) => {
        const chatEntrie = (_jsxs(_Fragment, { children: [_jsx(Typography, { component: "span", sx: style_authorTypo, children: `${message.author}` }), _jsx(Typography, { component: "span", children: `:\u00A0${message.content}` })] }));
        return (_jsx(ListItem, { sx: style_container, children: _jsx(ListItemText, { primary: chatEntrie }) }, index));
    });
    return (_jsxs(_Fragment, { children: [list_message, duringGuessingPhase && (_jsx(Typography, { sx: style_typingActivity, children: oratorIsTyping ? "L’orateur est en train d’écrire..." : "..." }))] }));
}
function checkOratorIsTyping(appState) {
    const { roomState } = appState;
    const duringGuessingPhase = roomState.roundPhase === "guessing one" || roomState.roundPhase === "guessing two";
    if (!duringGuessingPhase)
        return false;
    const playingTeam = getPlayingTeam.call(roomState);
    const players = Object.values(roomState.players);
    const playingOrator = players.find((player) => player.role === "orator" && player.team === playingTeam);
    return playingOrator?.isTyping;
}
const style_authorTypo = {
    color: "orange",
};
const style_container = {
    px: 0,
    py: 0,
};
const style_typingActivity = {
    color: "info.main",
};

import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Menu, MenuItem } from "@mui/material";
import { useTemporaryElement } from "../custom-hooks/use-temporary-element.js";
import { useRef } from "react";
import { socket } from "../config/initialize-socket-io.js";
export function ButtonManagePlayer({ player }) {
    const menu = useTemporaryElement(false);
    const anchorElement = useRef(null);
    const handleClick_promoteAdmin = () => {
        menu.remove();
        socket.emit("promoteAdmin", player.sessionId);
    };
    const handleClick_kickPlayer = () => {
        menu.remove();
        socket.emit("kickPlayer", player.sessionId);
    };
    return (_jsxs(_Fragment, { children: [_jsx(Button, { sx: style_buttonPlayer(player), onClick: menu.display, ref: anchorElement, children: player.isAdmin ? "*" + player.username : player.username }), _jsxs(Menu, { anchorEl: anchorElement.current, open: menu.displayed, onClose: menu.remove, children: [!player.isAdmin && _jsx(MenuItem, { onClick: handleClick_promoteAdmin, children: "Faire devenir h\u00F4te" }), _jsx(MenuItem, { onClick: handleClick_kickPlayer, children: "Expulser le joueur" })] })] }));
}
const style_buttonPlayer = (player) => {
    return {
        textDecorationLine: player.connected ? "none" : "line-through",
        padding: 0.5,
    };
};

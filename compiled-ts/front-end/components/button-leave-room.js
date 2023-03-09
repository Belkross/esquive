import { jsx as _jsx } from "react/jsx-runtime";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { socket } from "../config/initialize-socket-io.js";
export function ButtonLeaveRoom() {
    return (_jsx(Button, { startIcon: _jsx(LogoutIcon, {}), onClick: handleClick, sx: style_button, children: "Quitter le salon" }));
}
function handleClick() {
    socket.disconnect();
}
const buttonColor = "error.dark";
const style_button = {
    backgroundColor: buttonColor,
    borderColor: buttonColor,
    ":hover": {
        borderColor: buttonColor,
    },
};

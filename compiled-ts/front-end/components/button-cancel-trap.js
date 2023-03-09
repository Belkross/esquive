import { jsx as _jsx } from "react/jsx-runtime";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";
import { socket } from "../config/initialize-socket-io.js";
export default function ButtonCancelTrap({ trap }) {
    const handleClick = () => socket.emit("cancelTrap", trap);
    return (_jsx(IconButton, { onClick: handleClick, children: _jsx(CancelIcon, {}) }));
}

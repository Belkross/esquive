import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { socket } from "../../config/initialize-socket-io";
import { checkRoomValidity } from "../../../functions/check-room-validity.js";
import { checkUsernameValidity } from "../../../functions/check-username-validity.js";
import { useValidTextInput } from "../../custom-hooks/use-valid-text-input.js";
import shape from "../../theme/shape.js";
import { RoomState } from "../../../back-end/config/room-state/room-state.js";
export function FormLogging({ appState, setAppState }) {
    const [usernameInput, onUsernameInputChange] = useValidTextInput(appState.username, checkUsernameValidity);
    const [roomInput, onRoomInputChange] = useValidTextInput("", checkRoomValidity);
    const handleSubmit = () => {
        if (roomInput.validity && usernameInput.validity) {
            socket.auth = {
                ...socket.auth,
                username: usernameInput.value,
                room: roomInput.value,
            };
            socket.connect();
            setAppState((prevAppState) => ({
                ...prevAppState,
                status: "connectingToSocketIo",
                username: usernameInput.value,
            }));
            localStorage.setItem("username", usernameInput.value);
        }
    };
    return (_jsxs(Paper, { sx: style_container, children: [_jsx(Typography, { variant: "h2", children: "Cr\u00E9er ou rejoindre un salon" }), _jsx(TextField, { label: "Pseudo", fullWidth: true, value: usernameInput.value, onChange: onUsernameInputChange, helperText: `${RoomState.USERNAME_MIN_LENGTH} à ${RoomState.USERNAME_MAX_LENGTH} lettres` }), _jsx(TextField, { label: "Salon", fullWidth: true, value: roomInput.value, onChange: onRoomInputChange, helperText: `${RoomState.ROOMNAME_MIN_LENGTH} à ${RoomState.ROOMNAME_MAX_LENGTH} lettres` }), _jsx(Button, { onClick: handleSubmit, disabled: !roomInput.validity || !usernameInput.validity, children: "Valider" })] }));
}
const style_container = {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center",
    gap: 3,
    gridRow: "3/11",
    gridColumn: "1/6",
    justifySelf: "end",
    alignSelf: { lg: "start" },
    maxWidth: { lg: "450px" },
    width: "100%",
    backgroundImage: "none",
    padding: shape.spacingBase,
    borderRadius: shape.borderRadius,
    borderStyle: shape.borderStyle,
    borderColor: "background.border",
    borderWidth: shape.borderWidth,
};

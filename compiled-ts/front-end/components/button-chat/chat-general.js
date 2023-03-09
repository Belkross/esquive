import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { List, Stack, TextField, Button, useMediaQuery, useTheme } from "@mui/material";
import { useRef } from "react";
import { socket } from "../../config/initialize-socket-io.js";
import ButtonCloseElement from "../button-close-element.js";
import { TitleMenu } from "../button-menu/title-menu.js";
import { chatInitialInputState } from "./button-chat-general.js";
import handleChatInputChange from "./handle-chat-input-change.js";
import MessageList from "./message-list.js";
import { useChatAutoScroll } from "./use-chat-auto-scroll.js";
export function ChatGeneral({ appState, input, setInput, closeDrawer }) {
    const ulElement = useRef(null);
    const messages = appState.roomState.generalMessages;
    const smallScreenLayout = useMediaQuery(useTheme().breakpoints.down("lg"));
    const handleInputChange = (event) => handleChatInputChange(event, input, setInput);
    const handleSubmit = () => {
        if (input.validity) {
            socket.emit("submitChatMessage", "general", input.value);
            setInput(chatInitialInputState);
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && input.validity) {
            event.preventDefault(); //otherwise handleInputChange is triggered
            handleSubmit();
        }
    };
    useChatAutoScroll(messages, ulElement);
    return (_jsxs(_Fragment, { children: [_jsx(TitleMenu, { children: "Chat g\u00E9n\u00E9ral" }), _jsx(List, { ref: ulElement, dense: true, sx: style_chatMessageList, children: _jsx(MessageList, { messages: messages }) }), _jsxs(Stack, { sx: style_chatInputGroup, children: [_jsx(TextField, { value: input.value, onChange: handleInputChange, onKeyDown: handleKeyDown, placeholder: "Envoyer un message", multiline: true, fullWidth: true, helperText: `Caractères restants: ${input.characterRemaining}` }), _jsxs(Stack, { sx: style_buttons, children: [_jsx(Button, { onClick: handleSubmit, disabled: !input.validity, children: "Envoyer" }), smallScreenLayout && _jsx(ButtonCloseElement, { onClick: closeDrawer })] })] })] }));
}
export const style_chatMessageList = {
    backgroundColor: "background.default",
    gap: 0,
    overflowY: "scroll",
    overflowWrap: "break-word",
    height: "100%",
    padding: { xs: 1, sm: 2 },
};
export const style_chatInputGroup = {
    flexDirection: "column",
    alignItems: { xs: "center", sm: "end" },
    padding: 2,
    gap: 2,
};
const style_buttons = {
    flexDirection: "row",
    justifyContent: { xs: "space-between", lg: "end" },
    alignItems: "center",
    width: "100%",
};

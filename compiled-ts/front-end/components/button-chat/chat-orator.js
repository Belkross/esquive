import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { List, Stack, TextField, Button } from "@mui/material";
import { useRef } from "react";
import { getWhileClientIsOratorAndPlaying } from "../../../functions/get-while-client-is-orator-and-playing.js";
import { socket } from "../../config/initialize-socket-io.js";
import { TitleMenu } from "../button-menu/title-menu.js";
import { chatInitialInputState } from "./button-chat-general.js";
import { style_chatInputGroup, style_chatMessageList } from "./chat-general.js";
import handleChatInputChange from "./handle-chat-input-change.js";
import MessageListOrator from "./message-list-orator.js";
import { typingActivity } from "./typing-activity.js";
import { useChatAutoScroll } from "./use-chat-auto-scroll.js";
export function ChatOrator({ appState, input, setInput }) {
    const ulElement = useRef(null);
    const intervalIdRef = useRef(null);
    const { roomState } = appState;
    const messages = roomState.oratorMessages;
    const whileInputsDisplayed = getWhileClientIsOratorAndPlaying(appState);
    const whileInputsAvailable = whileInputsDisplayed && !roomState.isJudgingTrap;
    const whileSubmittable = whileInputsAvailable && input.validity;
    const handleInputChange = (event) => handleChatInputChange(event, input, setInput);
    const handleSubmit = () => {
        if (whileSubmittable) {
            socket.emit("submitChatMessage", "orator", input.value);
            setInput(chatInitialInputState);
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === "Backspace")
            return;
        if (event.key === "Enter" && whileSubmittable) {
            event.preventDefault(); //otherwise handleInputChange is triggered
            handleSubmit();
        }
        else {
            const clientWereNotTyping = intervalIdRef.current === null;
            if (clientWereNotTyping)
                typingActivity.start(intervalIdRef);
            else
                typingActivity.reset(intervalIdRef);
        }
    };
    useChatAutoScroll(messages, ulElement);
    return (_jsxs(_Fragment, { children: [_jsx(TitleMenu, { children: "Chat orateur" }), _jsx(List, { ref: ulElement, dense: true, sx: style_chatMessageList, children: _jsx(MessageListOrator, { messages: messages, appState: appState }) }), whileInputsDisplayed && (_jsxs(Stack, { sx: style_chatInputGroup, children: [_jsx(TextField, { value: input.value, onChange: handleInputChange, onKeyDown: handleKeyDown, placeholder: "Envoyer un message", multiline: true, fullWidth: true, helperText: `Caractères restants: ${input.characterRemaining}`, disabled: !whileInputsAvailable }), _jsx(Button, { onClick: handleSubmit, disabled: !whileSubmittable, children: "Envoyer" })] }))] }));
}

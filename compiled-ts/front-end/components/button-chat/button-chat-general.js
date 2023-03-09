import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge, Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import { useTemporaryElement } from "../../custom-hooks/use-temporary-element.js";
import shape from "../../theme/shape.js";
import { ButtonResponsive } from "../button-responsive.js";
import { ChatGeneral } from "./chat-general.js";
import ChatIcon from "@mui/icons-material/Chat";
import { RoomState } from "../../../back-end/config/room-state/room-state.js";
export const chatInitialInputState = {
    value: "",
    validity: false,
    characterRemaining: RoomState.CHAT_MESSAGE_MAX_LENGTH,
};
export function ButtonChatGeneral({ appState }) {
    const [badge, setBadge] = useState({ notification: 0, lastMessage: Date.now() });
    const [input, setInput] = useState(chatInitialInputState);
    const drawer = useTemporaryElement(false);
    const handleClick = () => {
        setBadge((prevBadge) => ({ ...prevBadge, notification: 0 }));
        drawer.display();
    };
    const { generalMessages } = appState.roomState;
    const lastMessageDate = generalMessages[generalMessages.length - 1].date;
    const newMessageReceived = lastMessageDate > badge.lastMessage;
    const hasToBeNotified = newMessageReceived && !drawer.displayed;
    useEffect(() => {
        if (newMessageReceived)
            setBadge((prevBadge) => ({
                lastMessage: lastMessageDate,
                notification: hasToBeNotified ? prevBadge.notification + 1 : prevBadge.notification,
            }));
    }, [hasToBeNotified, lastMessageDate, newMessageReceived]);
    return (_jsxs(_Fragment, { children: [_jsx(Badge, { badgeContent: badge.notification, color: "warning", children: _jsx(ButtonResponsive, { icon: _jsx(ChatIcon, {}), label: "G\u00E9n\u00E9ral", onClick: handleClick }) }), _jsx(Drawer, { variant: "temporary", anchor: "left", open: drawer.displayed, onClose: drawer.remove, PaperProps: { sx: style_drawer }, children: _jsx(ChatGeneral, { appState: appState, input: input, setInput: setInput, closeDrawer: drawer.remove }) })] }));
}
const style_drawer = {
    width: "100%",
    maxWidth: shape.drawerMaxWidth,
    height: "100%",
};

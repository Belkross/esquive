import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ButtonResponsive } from "../button-responsive.js";
import { useTemporaryElement } from "../../custom-hooks/use-temporary-element.js";
import { useEffect, useState } from "react";
import { Badge, Drawer } from "@mui/material";
import { NavbarChatOrator } from "./navbar-chat-orator.js";
import shape from "../../theme/shape.js";
import { ChatOrator } from "./chat-orator.js";
import OratorIcon from "@mui/icons-material/RecordVoiceOver";
import { chatInitialInputState } from "./button-chat-general.js";
export function ButtonChatOrator({ appState, openSubmitWordModal }) {
    const [badge, setBadge] = useState({ notification: 0, lastMessage: Date.now() });
    const [input, setInput] = useState(chatInitialInputState);
    const drawer = useTemporaryElement(false);
    const handleClick = () => {
        setBadge((prevBadge) => ({ ...prevBadge, notification: 0 }));
        drawer.display();
    };
    const { oratorMessages } = appState.roomState;
    const lastMessageDate = oratorMessages[oratorMessages.length - 1].date;
    const lastMessageAuthor = oratorMessages[oratorMessages.length - 1].author;
    const newMessageReceived = lastMessageDate > badge.lastMessage;
    const newMessageIsFromPlayer = lastMessageAuthor !== "Esquive";
    const hasToBeNotified = newMessageReceived && !drawer.displayed && newMessageIsFromPlayer;
    useEffect(() => {
        if (newMessageReceived)
            setBadge((prevBadge) => ({
                lastMessage: lastMessageDate,
                notification: hasToBeNotified ? prevBadge.notification + 1 : prevBadge.notification,
            }));
    }, [hasToBeNotified, lastMessageDate, newMessageReceived]);
    return (_jsxs(_Fragment, { children: [_jsx(Badge, { badgeContent: badge.notification, color: "warning", children: _jsx(ButtonResponsive, { icon: _jsx(OratorIcon, {}), label: "Orateur", onClick: handleClick }) }), _jsxs(Drawer, { variant: "temporary", anchor: "left", open: drawer.displayed, onClose: drawer.remove, PaperProps: { sx: style_drawer }, children: [_jsx(ChatOrator, { appState: appState, input: input, setInput: setInput }), _jsx(NavbarChatOrator, { closeDrawer: drawer.remove, appState: appState, openSubmitWordModal: openSubmitWordModal })] })] }));
}
const style_drawer = {
    width: "100%",
    maxWidth: shape.drawerMaxWidth,
    height: "100%",
};

import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ButtonLeaveRoom } from "../button-leave-room.js";
import { SwitchSoundActivation } from "../switch-sound-activation.js";
import { Stack } from "@mui/material";
import { LinkDiscord } from "../link-discord.js";
import shape from "../../theme/shape.js";
import { TitleMenu } from "./title-menu.js";
import { ScrollableContainer } from "./scrollable-container.js";
import { RoomManager } from "../room-manager.js";
import { SwitchRoomAccess } from "../switch-room-access.js";
export function MenuMain({ appState }) {
    return (_jsxs(_Fragment, { children: [_jsx(TitleMenu, { children: "Menu principal" }), _jsxs(ScrollableContainer, { children: [_jsx(Stack, { sx: style_menuElement, children: _jsx(LinkDiscord, {}) }), _jsx(Stack, { sx: style_menuElement, children: _jsx(SwitchSoundActivation, {}) }), _jsx(Stack, { sx: style_menuElement, children: _jsx(SwitchRoomAccess, { appState: appState }) }), _jsx(Stack, { sx: style_room, children: _jsx(RoomManager, { appState: appState }) }), _jsx(ButtonLeaveRoom, {})] })] }));
}
const style_menuElement = {
    flexFlow: "row nowrap",
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "background.paper",
    padding: 2,
    borderRadius: shape.borderRadius,
    alignItems: "center",
    gap: 2,
};
const style_room = {
    ...style_menuElement,
    flexFlow: "column nowrap",
    gap: 1,
    py: 5,
};

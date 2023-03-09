import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import shape from "../theme/shape.js";
import { ButtonChatGeneral } from "./button-chat/button-chat-general.js";
import { ButtonChatOrator } from "./button-chat/button-chat-orator.js";
import { ButtonMenu } from "./button-menu/button-menu.js";
import { ButtonSubmitWord } from "./button-submit-word/button-submit-word.js";
import { Timer } from "./timer.js";
export function ApplicationBar({ appState, openSubmitWordModal }) {
    const smallScreen = useMediaQuery(useTheme().breakpoints.down("lg"));
    return (_jsxs(Box, { component: "nav", sx: style_container, children: [_jsx(Timer, { appState: appState }), _jsxs(Stack, { sx: style_stackButtons, children: [smallScreen && _jsx(ButtonSubmitWord, { appState: appState, openModal: openSubmitWordModal }), _jsx(ButtonChatGeneral, { appState: appState }), _jsx(ButtonChatOrator, { appState: appState, openSubmitWordModal: openSubmitWordModal }), _jsx(ButtonMenu, { appState: appState })] })] }));
}
const style_container = {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: { xs: "center", sm: "space-between", xl: "space-around" },
    alignItems: "center",
    gap: 1.5,
    width: "100vw",
    minHeight: shape.appBarHeight,
    backgroundColor: "background.navBar",
    px: 2,
    py: 1.5,
    boxShadow: 16,
    zIndex: 2,
    borderColor: "primary.main",
    borderWidth: shape.borderWidth,
    borderTopStyle: { xs: shape.borderStyle, lg: "none" },
    borderBottomStyle: { xs: "none", lg: "solid" },
};
const style_stackButtons = {
    flexDirection: "row",
    gap: 1.2,
};

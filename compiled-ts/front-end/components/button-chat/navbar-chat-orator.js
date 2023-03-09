import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { Timer } from "../timer.js";
import { ButtonSubmitWord } from "../button-submit-word/button-submit-word.js";
import { style_tabs } from "../button-menu/tab-group-menu.js";
import ButtonCloseElement from "../button-close-element.js";
export function NavbarChatOrator({ closeDrawer, appState, openSubmitWordModal }) {
    const smallScreenLayout = useMediaQuery(useTheme().breakpoints.down("lg"));
    return (_jsxs(Stack, { component: "nav", sx: style_tabs, children: [_jsx(Timer, { appState: appState }), _jsx(ButtonSubmitWord, { appState: appState, openModal: openSubmitWordModal }), smallScreenLayout && _jsx(ButtonCloseElement, { onClick: closeDrawer })] }));
}

import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Drawer } from "@mui/material";
import { useTemporaryElement } from "../../custom-hooks/use-temporary-element.js";
import { ButtonResponsive } from "../button-responsive.js";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { MenuMain } from "./menu-main.js";
import { MenuTeam } from "./menu-team.js";
import { MenuRules } from "./menu-rules/menu-rules.js";
import { MenuSettings } from "./menu-settings.js";
import { TabGroupMenu } from "./tab-group-menu.js";
import shape from "../../theme/shape.js";
export function ButtonMenu({ appState }) {
    const drawer = useTemporaryElement(false);
    const [selectedTab, setSelectedTab] = useState("main");
    let tabContent;
    switch (selectedTab) {
        case "main":
            tabContent = _jsx(MenuMain, { appState: appState });
            break;
        case "team":
            tabContent = _jsx(MenuTeam, { appState: appState });
            break;
        case "rules":
            tabContent = _jsx(MenuRules, {});
            break;
        case "settings":
            tabContent = _jsx(MenuSettings, { appState: appState, closeMenu: drawer.remove });
            break;
        //no default
    }
    return (_jsxs(_Fragment, { children: [_jsx(ButtonResponsive, { icon: _jsx(MenuIcon, {}), label: "Menu", onClick: drawer.display }), _jsxs(Drawer, { variant: "temporary", anchor: "left", open: drawer.displayed, onClose: drawer.remove, PaperProps: { sx: style_drawer }, children: [_jsx(_Fragment, { children: tabContent }), _jsx(TabGroupMenu, { selectedTab: selectedTab, setSelectedTab: setSelectedTab, close: drawer.remove })] })] }));
}
const style_drawer = {
    width: "100%",
    maxWidth: shape.drawerMaxWidth,
    height: "100vh",
    overflow: "hidden",
};

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import RoomIcon from "@mui/icons-material/Home";
import TeamIcon from "@mui/icons-material/Groups";
import RuleIcon from "@mui/icons-material/HelpCenter";
import SettingsIcon from "@mui/icons-material/Settings";
import { ButtonResponsive } from "../button-responsive.js";
import shape from "../../theme/shape.js";
import ButtonCloseElement from "../button-close-element.js";
const tabs = [
    { id: "main", label: "Salon", icon: _jsx(RoomIcon, {}) },
    { id: "team", label: "Équipe", icon: _jsx(TeamIcon, {}) },
    { id: "rules", label: "Règles", icon: _jsx(RuleIcon, {}) },
    { id: "settings", label: "Réglages", icon: _jsx(SettingsIcon, {}) },
];
export function TabGroupMenu({ selectedTab, setSelectedTab, close }) {
    const smallScreenLayout = useMediaQuery(useTheme().breakpoints.down("lg"));
    const handleClick = (id) => setSelectedTab(id);
    const list_tab = tabs.map((tab) => {
        return (_jsx(ButtonResponsive, { label: tab.label, icon: tab.icon, onClick: () => handleClick(tab.id), selected: selectedTab === tab.id }, tab.id));
    });
    return (_jsxs(Stack, { component: "nav", sx: style_tabs, children: [list_tab, smallScreenLayout && _jsx(ButtonCloseElement, { onClick: close })] }));
}
export const style_tabs = {
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: { xs: 1, sm: 2 },
    flexShrink: 0,
    minHeight: shape.appBarHeight,
    backgroundColor: "background.navBar",
    px: 3,
    py: 1.5,
    zIndex: 2,
    boxShadow: 7,
    borderTopColor: "background.border",
    borderTopWidth: shape.borderWidth,
    borderTopStyle: shape.borderStyle,
};

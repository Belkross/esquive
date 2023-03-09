import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ButtonShuffleTeams } from "../button-shuffle-teams.js";
import { Teams } from "../teams.js";
import { ScrollableContainer } from "./scrollable-container.js";
import { TitleMenu } from "./title-menu.js";
export function MenuTeam({ appState }) {
    return (_jsxs(_Fragment, { children: [_jsx(TitleMenu, { children: "\u00C9quipes et r\u00F4les" }), _jsxs(ScrollableContainer, { children: [_jsx(Teams, { appState: appState }), _jsx(ButtonShuffleTeams, { appState: appState })] })] }));
}

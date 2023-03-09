import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stack, Typography } from "@mui/material";
import { Points } from "./points.js";
import { RoundAdvancementVisual } from "./round-advancement-visual.js";
export function Score({ appState }) {
    const winCondition = appState.roomState.winCondition;
    return (_jsxs(Stack, { sx: style_container, children: [_jsxs(Stack, { sx: style_score, children: [_jsx(RoundAdvancementVisual, { team: "one", appState: appState }), _jsx(Points, { team: "one", appState: appState }), _jsx(Typography, { sx: style_divider, children: "-" }), _jsx(Points, { team: "two", appState: appState }), _jsx(RoundAdvancementVisual, { team: "two", appState: appState })] }), _jsxs(Typography, { children: ["Partie en ", winCondition, " ", winCondition > 1 ? "points" : "point"] })] }));
}
const style_container = {
    flexFlow: "column nowrap",
    alignItems: "center",
    gridColumn: "1/12",
    gridRow: "1/2",
};
const style_score = {
    flexFlow: "row nowrap",
    alignItems: "center",
    gap: 1,
    marginRight: 1,
};
const style_divider = {
    fontSize: "30px",
};

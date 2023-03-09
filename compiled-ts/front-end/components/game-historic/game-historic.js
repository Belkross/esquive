import { jsx as _jsx } from "react/jsx-runtime";
import { Typography, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRef } from "react";
import shape from "../../theme/shape.js";
import { useAutoScroll } from "./use-auto-scroll.js";
export function GameHistoric({ appState }) {
    const { historic } = appState.roomState;
    const container = useRef(null);
    const list_historic = historic.map((message, index) => {
        return _jsx(Typography, { component: "li", sx: style_typography, children: `-${message}` }, index);
    });
    useAutoScroll(historic, container);
    return (_jsx(Stack, { component: "ul", ref: container, sx: style_container, children: list_historic }));
}
const style_container = {
    backgroundColor: "background.historic",
    borderRadius: shape.borderRadius,
    flexGrow: 1,
    padding: 1,
    boxShadow: 2,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: grey[800],
    gap: 0.6,
    margin: 0,
    overflow: "hidden",
};
const style_typography = {
    fontFamily: "Courier Prime , monospace",
};

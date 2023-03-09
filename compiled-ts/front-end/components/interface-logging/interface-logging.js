import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stack, Typography } from "@mui/material";
import { Introduction } from "../introduction/introduction.js";
import { FormLogging } from "./form-logging.js";
export function InterfaceLogging({ appState, setAppState }) {
    return (_jsxs(Stack, { sx: style_container, children: [_jsx(Typography, { variant: "h1", sx: style_title, children: "Esquive" }), _jsx(FormLogging, { appState: appState, setAppState: setAppState }), _jsx(Introduction, {})] }));
}
const style_container = {
    display: { xs: "flex", lg: "grid" },
    gridTemplateColumns: "repeat(12, 1fr)",
    gridTemplateRows: "repeat(12, 1fr)",
    alignItems: { xs: "center", lg: "center" },
    gap: { xs: 3, sm: 4, lg: "none" },
    rowGap: 3,
    columnGap: 4,
    justifyItems: "center",
    overflowY: "scroll",
    width: "100%",
    height: "100%",
    padding: { xs: 2, sm: 3, md: 8, lg: 4 },
};
const style_title = {
    marginBottom: { xs: 2, md: 4 },
    gridRow: "1/3",
    gridColumn: "1/13",
};

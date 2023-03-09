import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ButtonChangeRole } from "./button-change-role/button-change-role.js";
import { Stack } from "@mui/material";
export function Teams({ appState }) {
    return (_jsxs(Stack, { sx: style_container, children: [_jsxs(Stack, { sx: style_teamContainer, children: [_jsx(ButtonChangeRole, { team: "one", role: "orator", appState: appState }), _jsx(ButtonChangeRole, { team: "one", role: "guesser", appState: appState })] }), _jsxs(Stack, { sx: style_teamContainer, children: [_jsx(ButtonChangeRole, { team: "two", role: "orator", appState: appState }), _jsx(ButtonChangeRole, { team: "two", role: "guesser", appState: appState })] })] }));
}
const style_container = {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    gap: 5,
};
const style_teamContainer = {
    flexDirection: "column",
    alignItems: "start",
    gap: 2,
};

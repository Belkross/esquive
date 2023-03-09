import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Container } from "@mui/material";
export function InterfaceShared({ children }) {
    return (_jsx(_Fragment, { children: _jsx(Container, { sx: style_container, children: children }) }));
}
const style_container = {
    display: "flex",
    flexDirection: { xs: "column-reverse", lg: "column" },
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    maxWidth: { xs: "none" },
    padding: { xs: 0 },
    overflowY: "hidden",
};

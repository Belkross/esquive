import { jsx as _jsx } from "react/jsx-runtime";
import { Stack, Typography } from "@mui/material";
import shape from "../../theme/shape.js";
export function TitleMenu({ children }) {
    return (_jsx(Stack, { sx: style_container, children: _jsx(Typography, { variant: "h2", children: children }) }));
}
const style_container = {
    alignItems: "center",
    justifyContent: "center",
    borderBottomStyle: shape.borderStyle,
    borderBottomWidth: shape.borderWidth,
    borderBottomColor: "background.border",
    height: shape.appBarHeight,
    flexShrink: 0,
    backgroundColor: "background.navBar"
};

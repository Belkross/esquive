import { jsx as _jsx } from "react/jsx-runtime";
import { Typography } from "@mui/material";
export function Title({ text }) {
    return (_jsx(Typography, { variant: "h2", sx: style_title, children: text }));
}
const style_title = {
    color: "info.main",
    alignSelf: "start",
};

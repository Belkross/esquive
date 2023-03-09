import { jsx as _jsx } from "react/jsx-runtime";
import { Stack } from "@mui/material";
export function ScrollableContainer({ children }) {
    return _jsx(Stack, { sx: style_container, children: children });
}
const style_container = {
    flexFlow: "column nowrap",
    height: "100%",
    backgroundColor: "background.default",
    overflowY: "scroll",
    alignItems: "center",
    gap: { xs: 2, sm: 3, md: 4 },
    px: { xs: 2, sm: 2.5, md: 3 },
    py: { xs: 4, sm: 5, md: 6 },
};

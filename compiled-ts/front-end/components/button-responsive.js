import { jsx as _jsx } from "react/jsx-runtime";
import { Button, IconButton, useMediaQuery, useTheme } from "@mui/material";
export function ButtonResponsive({ icon, label, onClick, whileDisabled, sx, selected, breakpoint }) {
    const screenIsLargeEnough = useMediaQuery(useTheme().breakpoints.up(breakpoint || "md"));
    const backgroundColor = selected ? "background.navBar" : "primary.main";
    return screenIsLargeEnough ? (_jsx(Button, { startIcon: icon, onClick: onClick, disabled: whileDisabled, sx: { backgroundColor, ...sx }, children: label })) : (_jsx(IconButton, { onClick: onClick, disabled: whileDisabled, "aria-label": label, sx: { backgroundColor, ...sx }, children: icon }));
}

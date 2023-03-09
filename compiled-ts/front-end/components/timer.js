import { jsx as _jsx } from "react/jsx-runtime";
import { Typography } from "@mui/material";
import { formatDurationForTimer } from "../../functions/format-duration-for-timer.js";
import shape from "../theme/shape.js";
const SHORT_DURATION = 10;
export function Timer({ appState }) {
    const { roomState } = appState;
    const { timer: timeRemaining } = roomState;
    const timerState = deduceTimerState(roomState, timeRemaining);
    const duration = formatDurationForTimer(timeRemaining);
    return _jsx(Typography, { sx: style_typography(timerState), children: duration });
}
function deduceTimerState(roomState, duration) {
    const { isJudgingTrap, roundAdvancement } = roomState;
    const timerIsActive = roundAdvancement === 2 || roundAdvancement === 4 || roundAdvancement === 6;
    if (!timerIsActive || isJudgingTrap)
        return "inactive";
    else if (timerIsActive && duration > SHORT_DURATION)
        return "active";
    else if (timerIsActive && duration <= SHORT_DURATION)
        return "activeAndShort";
    else
        return "inactive";
}
const style_typography = (state) => {
    let color;
    switch (state) {
        case "inactive":
            color = "text.primary";
            break;
        case "active":
            color = "info.main";
            break;
        case "activeAndShort":
            color = "error.main";
            break;
        default:
            color = "text.primary";
    }
    return {
        color,
        fontSize: { xs: "28px", md: "31px" },
        fontWeight: "600",
        px: 1,
        borderRadius: `${shape.borderRadius}px`,
        boxShadow: 2,
        borderStyle: shape.borderStyle,
        borderWidth: "2px",
        borderColor: "primary.main",
        boxSizing: "border-box",
    };
};

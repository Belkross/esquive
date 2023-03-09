import { jsx as _jsx } from "react/jsx-runtime";
import Typography from "@mui/material/Typography";
export function Points({ team, appState }) {
    const score = appState.roomState.teams[team].score;
    return _jsx(Typography, { sx: style_score(team), children: score });
}
const style_score = (team) => ({
    color: `team.${team}`,
    fontSize: "30px",
    fontWeight: 900
});

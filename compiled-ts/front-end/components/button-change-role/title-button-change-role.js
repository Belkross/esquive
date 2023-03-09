import { jsx as _jsx } from "react/jsx-runtime";
import { Typography } from "@mui/material";
export function ButtonChangeRoleTitle({ role, team }) {
    const content = role === "guesser" ? "AUDITEUR" : "ORATEUR";
    return (_jsx(Typography, { variant: "h3", sx: style_title(team), children: content }));
}
const style_title = (team) => ({
    color: `team.${team}`,
});

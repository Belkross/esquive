import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stack } from "@mui/material";
import { ButtonVoteTrap } from "./button-vote-trap.js";
export function ButtonsVoteTrap({ trap, appState }) {
    return (_jsxs(Stack, { sx: style_buttonsThumb, children: [_jsx(ButtonVoteTrap, { voteType: true, trap: trap, appState: appState }), _jsx(ButtonVoteTrap, { voteType: false, trap: trap, appState: appState })] }));
}
const style_buttonsThumb = {
    flexDirection: "row",
    gap: 1,
};

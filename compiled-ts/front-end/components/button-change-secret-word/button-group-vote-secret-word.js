import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stack } from "@mui/material";
import { ButtonVoteSecretWord } from "./button-vote-secret-word.js";
export function ButtonGroupVoteSecretWord({ appState }) {
    return (_jsxs(Stack, { sx: style_thumbButtons, children: [_jsx(ButtonVoteSecretWord, { voteType: true, appState: appState }), _jsx(ButtonVoteSecretWord, { voteType: false, appState: appState })] }));
}
const style_thumbButtons = {
    flexDirection: "row",
    gap: 1,
};

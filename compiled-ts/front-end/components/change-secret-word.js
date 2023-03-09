import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Stack, Typography } from "@mui/material";
import { getPlayerTeam } from "../../functions/get-player-team.js";
import shape from "../theme/shape.js";
import { ButtonChangeSecretWord } from "./button-change-secret-word/button-change-secret-word.js";
import { ButtonGroupVoteSecretWord } from "./button-change-secret-word/button-group-vote-secret-word.js";
export function ChangeSecretWord({ appState }) {
    const { roomState, sessionId } = appState;
    const team = getPlayerTeam(roomState, sessionId);
    const secretWord = roomState.teams[team].secretWord.value;
    const duringTrappingPhase = roomState.roundPhase === "trapping";
    return (_jsxs(Stack, { sx: style_container, children: [_jsxs(Typography, { variant: "h3", children: ["Mot \u00E0 pi\u00E9ger : ", secretWord] }), duringTrappingPhase && (_jsxs(Stack, { sx: style_buttons, children: [_jsx(ButtonChangeSecretWord, { appState: appState }), _jsx(ButtonGroupVoteSecretWord, { appState: appState })] }))] }));
}
const style_container = {
    flexDirection: "column",
    gap: { xs: 2, sm: 2 },
    py: 1,
    alignItems: "center",
    marginBottom: 2,
    paddingBottom: 3,
    borderColor: "background.border",
    borderWidth: shape.borderWidth,
    borderBottomStyle: shape.borderStyle,
};
const style_buttons = {
    width: "100%",
    flexDirection: "row",
    alignItems: { xs: "center", sm: "center" },
    justifyContent: "center",
    gap: 3,
};

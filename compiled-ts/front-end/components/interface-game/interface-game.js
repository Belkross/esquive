import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { useTemporaryElement } from "../../custom-hooks/use-temporary-element.js";
import shape from "../../theme/shape.js";
import { ApplicationBar } from "../application-bar.js";
import { ButtonsJudgeTrap } from "../button-judge-trap.js";
import { ButtonPlayNextPhase } from "../button-play-next-phase.js";
import { ButtonReportForbiddenClue } from "../button-report-forbidden-clue.js";
import { ButtonSubmitWord } from "../button-submit-word/button-submit-word.js";
import { ModalSubmitWord } from "../button-submit-word/modal-submit-word.js";
import { useModalShortCut } from "../button-submit-word/use-modal-shortcut.js";
import { ChangeSecretWord } from "../change-secret-word.js";
import { GameHistoric } from "../game-historic/game-historic.js";
import { Instructions } from "../instructions.js";
import { Score } from "../score/score.js";
import { Teams } from "../teams.js";
import { TrapsRemaining } from "../traps-remaining.js";
import { Traps } from "../traps/traps.js";
import { getWhileModalAllowed } from "./get-while-modal-allowed.js";
import { useSubscribeRoomStateUpdate } from "./use-subscribe-room-state-update.js";
export function InterfaceGame({ appState, setAppState }) {
    const { displayed, display, remove } = useTemporaryElement(false);
    const breakpoint_xl = useMediaQuery(useTheme().breakpoints.up("xl"));
    const whileAppBarTop = useMediaQuery(useTheme().breakpoints.up("lg"));
    const whileModalAllowed = getWhileModalAllowed(appState);
    useSubscribeRoomStateUpdate(setAppState);
    useModalShortCut(whileModalAllowed, displayed, display);
    return (_jsxs(_Fragment, { children: [_jsx(ApplicationBar, { appState: appState, openSubmitWordModal: display }), _jsxs(Stack, { sx: style_board, children: [_jsx(Score, { appState: appState }), _jsxs(Stack, { sx: style_borderedPartOne, children: [_jsxs(Stack, { sx: style_buttons, children: [whileAppBarTop && _jsx(ButtonSubmitWord, { appState: appState, openModal: display }), _jsx(ButtonPlayNextPhase, { appState: appState })] }), _jsx(Instructions, { appState: appState }), _jsx(GameHistoric, { appState: appState }), _jsx(ButtonsJudgeTrap, { appState: appState })] }), _jsxs(Stack, { sx: style_secondPart, children: [_jsxs(Stack, { sx: style_borderedPartTwo, children: [_jsx(ChangeSecretWord, { appState: appState }), _jsx(ButtonReportForbiddenClue, { appState: appState }), _jsx(TrapsRemaining, { appState: appState }), _jsx(Traps, { appState: appState })] }), breakpoint_xl && _jsx(Teams, { appState: appState })] })] }), _jsx(ModalSubmitWord, { appState: appState, displayed: displayed, close: remove })] }));
}
const style_board = {
    display: { xs: "flex", lg: "grid" },
    gridTemplateColumns: "repeat(12, 1fr)",
    gridTemplateRows: "repeat(12, 1fr)",
    alignItems: { xs: "center", lg: "start" },
    gap: { xs: 3, sm: 4, lg: "none" },
    rowGap: 3,
    columnGap: 4,
    justifyItems: "center",
    overflowY: "scroll",
    width: "100%",
    height: "100%",
    padding: { xs: 2, sm: 3 },
};
const style_borderedBoardPart = {
    maxWidth: "500px",
    width: "100%",
    maxHeight: shape.trapSectionMaxHeight,
    height: "100%",
    gridRow: "2/13",
    alignSelf: { xs: "center", lg: "start" },
    marginBottom: 2,
    margin: 0,
    px: { xs: 1.5, sm: 2, md: 3 },
    py: { xs: 3 },
    boxShadow: 12,
    backgroundColor: "background.paper",
    borderWidth: shape.borderWidth,
    borderStyle: shape.borderStyle,
    borderColor: "background.border",
    borderRadius: shape.borderRadius,
};
const style_borderedPartOne = {
    ...style_borderedBoardPart,
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
    gap: { xs: 3, md: 4 },
    gridColumn: { xs: "1/13", lg: "1/7", xl: "1/6" },
    justifySelf: "end",
    minHeight: { xs: "450px", lg: shape.trapSectionMaxHeight },
};
const style_secondPart = {
    gridColumn: { xs: "1/13", lg: "7/13", xl: "6/13" },
    justifySelf: "start",
    flexFlow: "row nowrap",
    justifyContent: { xs: "center", lg: "start" },
    gap: 4,
    width: "100%",
};
const style_borderedPartTwo = {
    ...style_borderedBoardPart,
    overflow: "hidden",
    minHeight: shape.trapSectionMaxHeight,
};
const style_buttons = {
    flexFlow: "row nowrap",
    justifyContent: { xs: "center", lg: "space-between" },
    alignItems: "center",
};

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ValidateIcon from "@mui/icons-material/Done";
import RefuseIcon from "@mui/icons-material/Close";
import { socket } from "../config/initialize-socket-io.js";
import { ButtonResponsive } from "./button-responsive.js";
import { Stack } from "@mui/material";
export function ButtonsJudgeTrap({ appState }) {
    const whileDisabled = getWhileDisabled(appState);
    return (_jsxs(Stack, { sx: style_container, children: [_jsx(ButtonResponsive, { icon: _jsx(ValidateIcon, {}), label: "Accepter pi\u00E8ge", onClick: handleClick(true), whileDisabled: whileDisabled, sx: style_buttonValidate, breakpoint: "sm" }), _jsx(ButtonResponsive, { icon: _jsx(RefuseIcon, {}), label: "Refuser pi\u00E8ge", onClick: handleClick(false), whileDisabled: whileDisabled, sx: style_buttonRefuse, breakpoint: "sm" })] }));
}
function handleClick(judgement) {
    return () => socket.emit("judgeTrap", judgement);
}
function getWhileDisabled(appState) {
    const { roomState, sessionId } = appState;
    const clientIsAdmin = roomState.players[sessionId].isAdmin;
    const isJudgingTrap = roomState.isJudgingTrap;
    const roundPhase = roomState.roundPhase;
    const duringGuessingPhase = roundPhase === "guessing one" || roundPhase === "guessing two";
    const whileActivated = clientIsAdmin && isJudgingTrap && duringGuessingPhase;
    return !whileActivated;
}
const style_container = {
    flexDirection: "row",
    justifyContent: { xs: "center", lg: "end" },
    gap: 2,
};
const style_buttonValidate = {
    backgroundColor: "success.dark",
    borderColor: "success.dark",
};
const style_buttonRefuse = {
    backgroundColor: "error.dark",
    borderColor: "error.dark",
};

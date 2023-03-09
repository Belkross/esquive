import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, TextField, Button, Typography, useMediaQuery, useTheme, Grow } from "@mui/material";
import { forwardRef, useRef } from "react";
import { checkSubmitedWordValidity } from "../../../functions/check-submited-word-validity.js";
import { getPlayerTeam } from "../../../functions/get-player-team.js";
import { socket } from "../../config/initialize-socket-io.js";
import { useValidTextInputWithError } from "../../custom-hooks/use-valid-text-input-with-error.js";
import shape from "../../theme/shape.js";
import { Score } from "../score/score.js";
import { useAutoCloseWhenTimerEnd } from "./use-auto-close-when-timer-end.js";
import ButtonCloseElement from "../button-close-element.js";
import { getWhileModalAllowed } from "../interface-game/get-while-modal-allowed.js";
export function ModalSubmitWord({ appState, displayed, close }) {
    const { input, onInputChange, clearInput } = useValidTextInputWithError("", checkSubmitedWordValidity);
    const inputRef = useRef(null);
    const { roomState } = appState;
    const smallScreen = useMediaQuery(useTheme().breakpoints.down("md"));
    const submitionNotAllowed = !input.validity || !getWhileModalAllowed(appState);
    const handleSubmitionWithButton = () => {
        if (submitionNotAllowed)
            return;
        emitEventToServer(appState, input.value);
        clearInput();
        close();
    };
    const handleKeyDown = (event) => {
        const pressedEnter = event.key === "Enter";
        const pressedBackspace = event.key === "Backspace";
        if (pressedBackspace || submitionNotAllowed)
            return;
        if (pressedEnter) {
            if (!event.shiftKey) {
                event.preventDefault(); //allow the modal to close
                close();
            }
            emitEventToServer(appState, input.value);
            clearInput();
        }
    };
    const handleAnimationEnd = () => inputRef.current?.focus();
    useAutoCloseWhenTimerEnd(roomState.roundPhase, close, clearInput);
    return (_jsxs(Dialog, { open: displayed, onClose: close, onAnimationEnd: handleAnimationEnd, PaperProps: { sx: style_container }, fullScreen: smallScreen, transitionDuration: { enter: 300, exit: 0 }, TransitionComponent: Transition, children: [_jsx(ButtonCloseElement, { onClick: close, sx: { alignSelf: "end" } }), _jsx(Score, { appState: appState }), _jsxs(DialogContent, { sx: style_dialogContent, children: [_jsx(Typography, { variant: "h3", children: "Proposer un mot" }), _jsx(TextField, { variant: "filled", value: input.value, onChange: onInputChange, onKeyDown: handleKeyDown, autoComplete: "off", disabled: !getWhileModalAllowed(appState), sx: style_textField, error: input.error, inputRef: inputRef }), _jsx(Button, { onClick: handleSubmitionWithButton, disabled: !input.validity, sx: style_buttonSubmit(input.error), children: "Valider" }), _jsx(Typography, { variant: "caption", mt: 2, children: "Shift + Entr\u00E9e pour soumettre plusieurs mots \u00E0 la suite." })] })] }));
}
const Transition = forwardRef(function Transition(props, ref) {
    return _jsx(Grow, { ref: ref, ...props });
});
function emitEventToServer(appState, inputValue) {
    const { roomState, sessionId } = appState;
    const { roundPhase, roundAdvancement } = roomState;
    const isTrappingPhase = roundPhase === "trapping" && roundAdvancement === 2;
    const clientGuessingPhase = `guessing ${getPlayerTeam(roomState, sessionId)}`;
    const isClientGuessingPhase = roundPhase === clientGuessingPhase && (roundAdvancement === 4 || roundAdvancement === 6);
    if (isTrappingPhase)
        socket.emit("submitTrap", inputValue);
    else if (isClientGuessingPhase)
        socket.emit("submitGuess", inputValue);
}
const style_container = {
    gap: 3,
    padding: { xs: 2, sm: 3 },
    backgroundImage: "none",
    borderWidth: shape.borderWidth,
    borderStyle: shape.borderStyle,
    borderColor: "background.border",
};
const style_buttonSubmit = (error) => {
    const errorColor = "error.main";
    const errorStyle = { backgroundColor: errorColor, borderColor: errorColor };
    return error ? errorStyle : null;
};
const style_textField = {
    width: { xs: "220px", sm: "260px" },
};
const style_dialogContent = {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    alignItems: "center",
};

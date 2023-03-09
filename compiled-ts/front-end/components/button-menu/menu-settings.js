import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { TextField, Button } from "@mui/material";
import { RoomState } from "../../../back-end/config/room-state/room-state.js";
import { checkGuessAttemptsValidity } from "../../../functions/check-guess-attempts-validity.js";
import { checkTimerDurationValidity } from "../../../functions/check-timer-duration-validity.js";
import { checkTrapSlotsValidity } from "../../../functions/check-trap-slots-validity.js";
import { checkWinConditionValidity } from "../../../functions/check-win-condition-validity.js";
import { socket } from "../../config/initialize-socket-io.js";
import { useValidNumberInput } from "../../custom-hooks/use-valid-number-input.js";
import { ScrollableContainer } from "./scrollable-container.js";
import { TitleMenu } from "./title-menu.js";
// prettier-ignore
export function MenuSettings({ appState, closeMenu }) {
    const { roomState, sessionId } = appState;
    const [trapLimit, onTrapLimitChange] = useValidNumberInput(roomState.trapSlotsProvided, checkTrapSlotsValidity);
    const [guessLimit, onGuessLimitChange] = useValidNumberInput(roomState.guessAttemptsProvided, checkGuessAttemptsValidity);
    const [winCondition, onWinConditionChange] = useValidNumberInput(roomState.winCondition, checkWinConditionValidity);
    const [trappingDuration, onTrappingDurationChange] = useValidNumberInput(roomState.trappingDuration, checkTimerDurationValidity);
    const [guessingDuration, onGuessingDurationChange] = useValidNumberInput(roomState.guessingDuration, checkTimerDurationValidity);
    const whileDisabled = getWhileDisabled(roomState, sessionId);
    const whileSubmittable = trapLimit.validity && guessLimit.validity && winCondition.validity && trappingDuration.validity && guessingDuration.validity && !whileDisabled;
    const handleSubmit = () => {
        if (!whileSubmittable)
            return;
        const newSettings = formatNewSettings({
            trapSlotProvided: trapLimit.value,
            guessAttemptProvided: guessLimit.value,
            trappingDuration: trappingDuration.value,
            guessingDuration: guessingDuration.value,
            winCondition: winCondition.value,
        });
        socket.emit("changeRoundSettings", newSettings);
        closeMenu();
    };
    return (_jsxs(_Fragment, { children: [_jsx(TitleMenu, { children: "R\u00E8glages partie" }), _jsxs(ScrollableContainer, { children: [_jsx(TextField, { label: `Nombre de piège (${RoomState.TRAP_SLOT_LIMIT} max)`, value: trapLimit.value, onChange: onTrapLimitChange, error: !trapLimit.validity, disabled: whileDisabled }), _jsx(TextField, { label: `Nombre de proposition (${RoomState.GUESS_ATTEMPT_LIMIT} max)`, value: guessLimit.value, onChange: onGuessLimitChange, error: !guessLimit.validity, disabled: whileDisabled }), _jsx(TextField, { label: `Condition de victoire (${RoomState.WIN_CONDITION_LIMIT} max)`, value: winCondition.value, onChange: onWinConditionChange, error: !winCondition.validity, disabled: whileDisabled }), _jsx(TextField, { label: `Durée phase piège (${RoomState.TIMER_LIMIT}s max)`, value: trappingDuration.value, onChange: onTrappingDurationChange, error: !trappingDuration.validity, disabled: whileDisabled }), _jsx(TextField, { label: `Durée phase oration (${RoomState.TIMER_LIMIT}s max)`, value: guessingDuration.value, onChange: onGuessingDurationChange, error: !guessingDuration.validity, disabled: whileDisabled }), _jsx(Button, { onClick: handleSubmit, disabled: !whileSubmittable, children: "Valider" })] })] }));
}
function getWhileDisabled(roomState, sessionId) {
    const duringPreRoundPhase = roomState.roundPhase === "pre round";
    const clientIsAdmin = roomState.players[sessionId].isAdmin === true;
    const whileActivated = clientIsAdmin && duringPreRoundPhase;
    return !whileActivated;
}
function formatNewSettings(settings) {
    const { trapSlotProvided, trappingDuration, guessAttemptProvided, guessingDuration, winCondition } = settings;
    return {
        trapSlotProvided: Number.parseInt(trapSlotProvided, 10),
        guessAttemptProvided: Number.parseInt(guessAttemptProvided, 10),
        winCondition: Number.parseInt(winCondition, 10),
        trappingDuration: Number.parseInt(trappingDuration, 10),
        guessingDuration: Number.parseInt(guessingDuration, 10),
    };
}

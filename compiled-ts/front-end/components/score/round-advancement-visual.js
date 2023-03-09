import { jsx as _jsx } from "react/jsx-runtime";
import SuccessIcon from "@mui/icons-material/CheckCircle";
import TrappedIcon from "@mui/icons-material/Error";
import CircleIcon from "@mui/icons-material/Circle";
import FailureIcon from "@mui/icons-material/Cancel";
import { Stack } from "@mui/material";
export function RoundAdvancementVisual({ team, appState }) {
    const { roomState } = appState;
    const eventSlots = createEventSlots(roomState);
    const teamEvents = writeTeamEvents(roomState, eventSlots, team);
    const list = teamEvents.map((event, index) => {
        switch (event) {
            case "slot":
                return _jsx(CircleIcon, { sx: style_iconNeutral(roomState.roundPhase === `guessing ${team}`) }, index);
                break;
            case "fail":
                return _jsx(FailureIcon, { sx: style_iconFailure }, index);
                break;
            case "trapped":
                return _jsx(TrappedIcon, { sx: style_iconFailure }, index);
                break;
            case "success":
                return _jsx(SuccessIcon, { sx: style_iconSuccess }, index);
                break;
            default:
                return _jsx(CircleIcon, {}, index);
        }
    });
    return _jsx(Stack, { sx: style_container, children: list });
}
function createEventSlots(roomState) {
    const numberOfAttemptProvided = roomState.guessAttemptsProvided;
    const slots = [];
    for (let slot = 0; slot < numberOfAttemptProvided; ++slot) {
        slots.push("slot");
    }
    return slots;
}
function writeTeamEvents(roomState, slots, team) {
    const numberOfAttemptProvided = roomState.guessAttemptsProvided;
    const teamSucceededRound = roomState.teams[team].hasSucceededGuess;
    const teamHasBeenTrapped = roomState.teams[team].trapped;
    const guessAttemptUsed = numberOfAttemptProvided - roomState.teams[team].guessAttemptsRemaining;
    const numberOfFailedGuess = teamSucceededRound ? guessAttemptUsed - 1 : guessAttemptUsed;
    const arrayOfEvents = [...slots];
    for (let slot = 0; slot < numberOfFailedGuess; ++slot) {
        arrayOfEvents[slot] = "fail";
    }
    if (teamSucceededRound) {
        arrayOfEvents[guessAttemptUsed - 1] = "success";
    }
    else if (teamHasBeenTrapped) {
        arrayOfEvents[guessAttemptUsed] = "trapped";
    }
    return arrayOfEvents;
}
const style_container = {
    flexFlow: "row nowrap",
};
const size = "20px";
const style_iconSuccess = {
    color: "success.main",
    width: size,
    height: size,
};
const style_iconFailure = {
    color: "warning.main",
    width: size,
    height: size,
};
const style_iconNeutral = (playing) => {
    return {
        color: playing ? "primary.light" : "text.disabled",
        width: size,
        height: size,
    };
};

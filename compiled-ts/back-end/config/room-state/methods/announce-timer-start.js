import { doNothing } from "../../../../functions/do-nothing.js";
export function announceTimerStart(username) {
    if (username === undefined) {
        doNothing();
    }
    else {
        this.addToHistoric(`${username} démarre le minuteur !`);
    }
}

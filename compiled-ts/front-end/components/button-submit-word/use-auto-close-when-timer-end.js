import { useEffect } from "react";
export function useAutoCloseWhenTimerEnd(roundPhase, closeModal, clearInput) {
    useEffect(() => {
        const isPassivePhase = roundPhase === "pre round" || roundPhase === "pre guessing one" || roundPhase === "pre guessing two";
        if (isPassivePhase) {
            closeModal();
            clearInput();
        }
    }, [clearInput, closeModal, roundPhase]);
}

import { useEffect } from "react";
export function useModalShortCut(whileModalAllowed, displayed, display) {
    useEffect(() => {
        const keyDownHandler = (event) => {
            if (whileModalAllowed && !displayed && event.shiftKey && event.key === "Enter")
                display();
        };
        document.addEventListener("keydown", keyDownHandler);
        return () => document.removeEventListener("keydown", keyDownHandler);
    }, [displayed, display, whileModalAllowed]);
}

import { useCallback, useState } from "react";
export function useTemporaryElement(initialState) {
    const [elementDisplay, setElementDisplay] = useState(initialState);
    const displayElement = useCallback(() => setElementDisplay(true), []);
    const removeElement = useCallback(() => setElementDisplay(false), []);
    return {
        displayed: elementDisplay,
        display: displayElement,
        remove: removeElement,
    };
}

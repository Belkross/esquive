import { useEffect } from "react";
export function useAutoScroll(messages, ulElement) {
    useEffect(() => {
        if (ulElement.current) {
            ulElement.current.scrollTop = ulElement.current.scrollHeight;
        }
    }, [messages, ulElement]);
}
